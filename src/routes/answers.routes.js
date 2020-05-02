const AnswerController = require('../controllers/AnswerController')
const express = require('express')

const AnswerRouter = express.Router()

AnswerRouter.get('/', AnswerController.find)
AnswerRouter.post('/', AnswerController.create)

module.exports = AnswerRouter
