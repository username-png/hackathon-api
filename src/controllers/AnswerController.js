const uuid = require('uuid/v4')
const connection = require('../database/connection')

module.exports = {
  async index(request, response) {
    const answer = await connection('answer')
    .where()
    .select('*')

    return response.json(products)
  },

  async create(request, response) {
    const { answer, auto_answer, user, product_id, question_id } = request.body

    const id = uuid()

    await connection('products').insert({
      id,
      answer,
      auto_answer,
      user,
      product_id,
      question_id,
    })

    return response.json({ id, name })
  },
}
