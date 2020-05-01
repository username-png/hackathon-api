const uuid = require('uuid')
const connection = require('../database/connection')

module.exports = {
  async index(request, response) {
    const products = await connection('products').select('*')

    return response.json(products)
  },

  async create(request, response) {
    const { name, quantity, size, color, price, weight, description } = request.body

    const id = uuid.v4()

    const {width, height, lenght} = size

    await connection('products').insert({
      id,
      name,
      quantity,
      width,
      height,
      lenght,
      color,
      price,
      weight,
      description,
    })

    return response.json({ id, name })
  },
}
