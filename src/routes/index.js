const express = require('express')

const questionRouter = require('./questions.routes')
const productsRouter = require('./products.routes')
const testeRouter = require('./teste.routes')

const routes = express.Router()

routes.use('/questions', questionRouter)

routes.use('/products', productsRouter)

routes.use('/teste', testeRouter)

module.exports = routes
