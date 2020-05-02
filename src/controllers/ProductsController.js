const uuid = require('uuid')
const connection = require('../database/connection')

module.exports = {
  async index(request, response) {
    try {
      const products = await connection('products').select('*')

      return response.json(products)
    } catch (err) {
      return response.json(err).status(500)
    }
  },

  async create(request, response) {
    try {
      const {
        name,
        quantity,
        size,
        color,
        price,
        weight,
        description,
      } = request.body
      let width = null
      let height = null
      let lenght = null

      const id = uuid.v4()
      if (size.width && size.height && size.lenght) {
        width = size.width
        height = size.height
        lenght = size.lenght
      }

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
    } catch (err) {
      return response.json(err)
    }
  },
}
