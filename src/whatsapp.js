'use strict'
/*
 * SMSala WhatsApp Messaging Service
 * Docs: https://api2.smsala.com
 *
 * OTPs are stored in-memory (Map). For production with multiple
 * server instances, replace the otpStore with Redis or a DB table.
 */

require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') })

const https  = require('https')
const crypto = require('crypto')
const logger = require('./logger')

const API_TOKEN     = process.env.WHATSAPP_API_TOKEN   || ''
const ENABLED       = process.env.WHATSAPP_ENABLED === 'true'
const OTP_TEMPLATE  = process.env.WHATSAPP_TPL_OTP     || ''
const BILL_TEMPLATE = process.env.WHATSAPP_TPL_BILL    || ''
const CONTACT_TPL   = process.env.WHATSAPP_TPL_CONTACT || ''

const OTP_EXPIRY_MS = 10 * 60 * 1000   // 10 minutes
const OTP_LENGTH    = 6

// ── In-memory OTP store ───────────────────────────────────────────────────────
// key: `${phone}:${purpose}`
// value: { hash: string, expiresAt: number, used: boolean }

const otpStore = new Map()

// ── HTTP helper — JSON POST ───────────────────────────────────────────────────

function postJson(path, body) {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify(body)
    const options = {
      hostname: 'api2.smsala.com',
      path,
      method: 'POST',
      headers: {
        'Content-Type':   'application/json',
        'Content-Length': Buffer.byteLength(payload),
      },
    }
    const req = https.request(options, res => {
      let data = ''
      res.on('data', chunk => { data += chunk })
      res.on('end', () => {
        try { resolve(JSON.parse(data)) }
        catch { resolve({ raw: data }) }
      })
    })
    req.on('error', reject)
    req.write(payload)
    req.end()
  })
}

// ── HTTP helper — form-encoded POST ──────────────────────────────────────────

function postForm(path, body) {
  return new Promise((resolve, reject) => {
    const payload = Object.entries(body)
      .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
      .join('&')
    const options = {
      hostname: 'api2.smsala.com',
      path,
      method: 'POST',
      headers: {
        'Content-Type':   'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(payload),
      },
    }
    const req = https.request(options, res => {
      let data = ''
      res.on('data', chunk => { data += chunk })
      res.on('end', () => {
        try { resolve(JSON.parse(data)) }
        catch { resolve({ raw: data }) }
      })
    })
    req.on('error', reject)
    req.write(payload)
    req.end()
  })
}

// ── Phone normaliser — returns "91XXXXXXXXXX" or null ─────────────────────────

function normalisePhone(raw) {
  if (!raw) return null
  const digits = String(raw).replace(/\D/g, '')
  if (digits.length === 10)                              return `91${digits}`
  if (digits.length === 12 && digits.startsWith('91'))   return digits
  if (digits.length === 11 && digits.startsWith('0'))    return `91${digits.slice(1)}`
  return null
}

// ── OTP generator ─────────────────────────────────────────────────────────────

function generateOtp() {
  const buf = crypto.randomBytes(4)
  const num = buf.readUInt32BE(0) % 1_000_000
  return String(num).padStart(OTP_LENGTH, '0')
}

// ── OTP store helpers ─────────────────────────────────────────────────────────

function saveOtp(phone, otpCode, purpose) {
  const key  = `${phone}:${purpose}`
  const hash = crypto.createHash('sha256').update(otpCode).digest('hex')
  otpStore.set(key, { hash, expiresAt: Date.now() + OTP_EXPIRY_MS, used: false })
}

function checkAndConsumeOtp(phone, otpCode, purpose) {
  const key    = `${phone}:${purpose}`
  const record = otpStore.get(key)
  if (!record) return false
  if (record.used) return false
  if (Date.now() > record.expiresAt) { otpStore.delete(key); return false }

  const hash = crypto.createHash('sha256').update(String(otpCode)).digest('hex')
  if (hash !== record.hash) return false

  record.used = true
  otpStore.set(key, record)
  return true
}

// ── sendOtp ───────────────────────────────────────────────────────────────────

async function sendOtp(phone, purpose) {
  const normPhone = normalisePhone(phone)
  if (!normPhone) throw new Error('Invalid phone number.')

  if (!ENABLED) {
    const otpCode = generateOtp()
    saveOtp(normPhone, otpCode, purpose)
    logger.info(`[WhatsApp] Disabled — OTP for ${normPhone} (${purpose}): ${otpCode}`)
    return { sent: false, dev_otp: process.env.NODE_ENV !== 'production' ? otpCode : undefined }
  }

  if (!API_TOKEN || API_TOKEN.startsWith('REPLACE')) {
    throw new Error('WhatsApp API token not configured.')
  }

  const otpCode = generateOtp()
  saveOtp(normPhone, otpCode, purpose)

  let result
  try {
    result = await postJson('/whatsapp/SendOtp', {
      PhoneNumber: normPhone,
      OtpCode:     otpCode,
      ApiToken:    API_TOKEN,
      TemplateId:  OTP_TEMPLATE || undefined,
    })
  } catch (err) {
    throw new Error('Failed to send OTP. Please try again.')
  }

  const success = result.IsSuccess === true || result.ErrorCode === 0
  if (!success) throw new Error(result.ErrorDescription || 'OTP delivery failed.')

  logger.info(`[WhatsApp] OTP sent to ${normPhone} (${purpose}) — CampaignId: ${result.ReturnData}`)
  return { sent: true }
}

// ── verifyOtp ─────────────────────────────────────────────────────────────────

async function verifyOtp(phone, otpCode, purpose) {
  const normPhone = normalisePhone(phone)
  if (!normPhone) return false
  return checkAndConsumeOtp(normPhone, otpCode, purpose)
}

// ── sendBillLink ──────────────────────────────────────────────────────────────
// Template vars: {1}=shopName  {2}=billNumber  {3}=receiptUrl

async function sendBillLink({ phone, shopName, billNumber, receiptUrl }) {
  const normPhone = normalisePhone(phone)
  if (!normPhone) return { sent: false, error: 'Invalid phone number' }

  if (!ENABLED) {
    logger.info(`[WhatsApp] Disabled — would send receipt link for #${billNumber} to ${normPhone}`)
    return { sent: false, skipped: true }
  }

  if (!API_TOKEN || API_TOKEN.startsWith('REPLACE')) {
    logger.warn('[WhatsApp] API token not configured — skipping bill send')
    return { sent: false, error: 'API token not configured' }
  }

  if (!BILL_TEMPLATE || BILL_TEMPLATE.startsWith('REPLACE')) {
    logger.warn('[WhatsApp] Bill template ID not configured — skipping')
    return { sent: false, error: 'Bill template not configured' }
  }

  const clean  = v => String(v).replace(/,/g, '')
  const sample = [clean(shopName), clean(billNumber), receiptUrl].join(',')

  let result
  try {
    result = await postForm('/whatsapp/SendMessage', {
      ApiToken:     API_TOKEN,
      TemplateId:   BILL_TEMPLATE,
      QuickNumber:  normPhone,
      Sample:       sample,
      CampaignName: 'bill_receipt',
    })
  } catch (err) {
    logger.error({ err }, `[WhatsApp] Network error sending receipt link for #${billNumber}`)
    return { sent: false, error: err.message }
  }

  const success = result.IsSuccess === true || result.ErrorCode === 0
  if (success) {
    logger.info(`[WhatsApp] Receipt link for #${billNumber} sent to ${normPhone} — CampaignId: ${result.ReturnData}`)
  } else {
    logger.warn({ result }, `[WhatsApp] Receipt link send failed for #${billNumber}`)
  }

  return success
    ? { sent: true, campaignId: result.ReturnData }
    : { sent: false, error: result.ErrorDescription || JSON.stringify(result) }
}

// ── sendContactForm ───────────────────────────────────────────────────────────
// Template vars: {1}=name  {2}=email  {3}=company  {4}=subject  {5}=message

async function sendContactForm({ name, email, company, subject, message, phone }) {
  const normPhone = normalisePhone(phone)
  if (!normPhone) return { sent: false, error: 'Invalid phone number' }

  if (!ENABLED) {
    logger.info(`[WhatsApp] Disabled — would send contact form from ${email} to ${normPhone}`)
    return { sent: false, skipped: true }
  }

  if (!API_TOKEN || API_TOKEN.startsWith('REPLACE')) {
    logger.warn('[WhatsApp] API token not configured — skipping contact send')
    return { sent: false, error: 'API token not configured' }
  }

  if (!CONTACT_TPL || CONTACT_TPL.startsWith('REPLACE')) {
    logger.warn('[WhatsApp] Contact template ID not configured — skipping')
    return { sent: false, error: 'Contact template not configured' }
  }

  const clean  = v => String(v).replace(/,/g, '')
  const sample = [clean(name), clean(email), clean(company), clean(subject), clean(message)].join(',')

  let result
  try {
    result = await postForm('/whatsapp/SendMessage', {
      ApiToken:     API_TOKEN,
      TemplateId:   CONTACT_TPL,
      QuickNumber:  normPhone,
      Sample:       sample,
      CampaignName: 'contact_form',
    })
  } catch (err) {
    logger.error({ err }, `[WhatsApp] Network error sending contact form from ${email}`)
    return { sent: false, error: err.message }
  }

  const success = result.IsSuccess === true || result.ErrorCode === 0
  if (success) {
    logger.info(`[WhatsApp] Contact form from ${email} sent to ${normPhone} — CampaignId: ${result.ReturnData}`)
  } else {
    logger.warn({ result }, `[WhatsApp] Contact form send failed from ${email}`)
  }

  return success
    ? { sent: true, campaignId: result.ReturnData }
    : { sent: false, error: result.ErrorDescription || JSON.stringify(result) }
}

module.exports = { sendOtp, verifyOtp, normalisePhone, sendBillLink, sendContactForm }
