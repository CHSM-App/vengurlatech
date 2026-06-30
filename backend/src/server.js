'use strict'
require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') })

const app    = require('./app')
const logger = require('./logger')

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  logger.info(`[Server] Listening on http://localhost:${PORT}`)
})
