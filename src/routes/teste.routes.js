const express = require('express')
const TesteController = require('../controllers/TesteController')
const teste = express.Router()

teste.get('/', TesteController.callName)

module.exports = teste
