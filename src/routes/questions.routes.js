const QuestionController = require('../controllers/QuestionController')
const express = require('express')

const productsRouter = express.Router()

productsRouter.get('/', QuestionController.index)
productsRouter.post('/', QuestionController.create)
productsRouter.patch('/update', QuestionController.update)

module.exports = productsRouter
