const express = require('express')

const questionRouter = require('./questions.routes')
const productsRouter = require('./products.routes')
const answersRouter = require('./answers.routes')

const routes = express.Router()

// routes.use('/questions', questionRouter)

// routes.use('/answers', answersRouter)

routes.use('/products', productsRouter)

module.exports = routes
