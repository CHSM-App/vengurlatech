'use strict'
require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') })

const express   = require('express')
const helmet    = require('helmet')
const cors      = require('cors')
const rateLimit = require('express-rate-limit')
const logger    = require('./logger')

const whatsappRouter = require('./routes/whatsapp')

const app = express()

// ── Security headers
app.use(helmet())

// ── CORS
app.use(cors({
  origin:      process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true,
}))

// ── Body parser (10 kb limit to prevent payload bombs)
app.use(express.json({ limit: '10kb' }))

// ── Global rate limiter: 100 req / 15 min per IP
app.use(rateLimit({
  windowMs:        15 * 60 * 1000,
  max:             100,
  standardHeaders: true,
  legacyHeaders:   false,
  message:         { error: 'Too many requests, please try again later.' },
}))

// ── Contact form limiter: 10 req / hour per IP
const contactLimiter = rateLimit({
  windowMs:        60 * 60 * 1000,
  max:             10,
  standardHeaders: true,
  legacyHeaders:   false,
  message:         { error: 'Too many contact form submissions. Please try again later.' },
})

// ── Bill send limiter: 5 req / 15 min per IP
const billLimiter = rateLimit({
  windowMs:        15 * 60 * 1000,
  max:             5,
  standardHeaders: true,
  legacyHeaders:   false,
  message:         { error: 'Too many bill messages. Please wait before sending another.' },
})

app.use('/api/whatsapp/send-contact', contactLimiter)
app.use('/api/whatsapp/send-bill',    billLimiter)

// ── Routes
app.use('/api/whatsapp', whatsappRouter)

// ── Health check
app.get('/health', (_req, res) => res.json({ status: 'ok' }))

// ── Serve React frontend (built into public/)
const path        = require('path')
const STATIC_DIR  = path.join(__dirname, '..', 'public')
app.use(express.static(STATIC_DIR))

// SPA fallback — send index.html for any unknown route
app.get('*', (_req, res) => {
  res.sendFile(path.join(STATIC_DIR, 'index.html'))
})

// ── Global error handler
app.use((err, _req, res, _next) => {
  logger.error({ err }, 'Unhandled error')
  res.status(500).json({ error: 'Internal server error' })
})

module.exports = app
