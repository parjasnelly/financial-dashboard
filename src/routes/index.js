const express = require('express')

const homeRoutes = require('./homeRoutes')
const admPanelRoutes = require('./dashboardRoutes')

const route = express.Router()

route.use('/', homeRoutes)
route.use('/dashboard', admPanelRoutes)

module.exports = route
