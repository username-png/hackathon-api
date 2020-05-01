const uuid = require('uuid')
const connection = require('../database/connection')

module.exports = {
  async index(request, response) {
    const products = await connection('products').select('*')

    return response.json(products)
  },

  async create(request, response) {
    const { name, quantity, size, color, price, weight, image } = request.body

    const id = uuid.v4()

    await connection('products').insert({
      id,
      name,
      quantity,
      size,
      color,
      price,
      weight,
      image,
    })

    return response.json({ id, name })
  },
}
