const ProductsController = require('../controllers/ProductsController')
const express = require('express')

const productsRouter = express.Router()

productsRouter.get('/', ProductsController.index)
productsRouter.post('/', ProductsController.create)

module.exports = productsRouter
