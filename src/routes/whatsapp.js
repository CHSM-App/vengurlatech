'use strict'
const express = require('express')
const { sendBillLink, sendContactForm } = require('../whatsapp')

const router = express.Router()

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const BUSINESS_PHONE = '9422229951'

// POST /api/whatsapp/send-contact
router.post('/send-contact', async (req, res) => {
  const { name, email, company, subject, message } = req.body

  if (!name || !email || !company || !subject || !message)
    return res.status(400).json({ error: 'All fields are required: name, email, company, subject, message' })
  if (!EMAIL_RE.test(email))
    return res.status(400).json({ error: 'Invalid email address' })

  const result = await sendContactForm({ name, email, company, subject, message, phone: BUSINESS_PHONE })
  if (result.sent || result.skipped) return res.json({ success: true, ...result })
  res.status(500).json({ success: false, error: result.error })
})

// POST /api/whatsapp/send-bill
router.post('/send-bill', async (req, res) => {
  const { phone, shopName, billNumber, receiptUrl } = req.body

  if (!phone || !shopName || !billNumber || !receiptUrl)
    return res.status(400).json({ error: 'phone, shopName, billNumber, and receiptUrl are required' })

  const result = await sendBillLink({ phone, shopName, billNumber, receiptUrl })
  if (result.sent || result.skipped) return res.json({ success: true, ...result })
  res.status(500).json({ success: false, error: result.error })
})

module.exports = router
