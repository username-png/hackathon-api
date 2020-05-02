const connection = require('../database/connection')
const uuid = require('uuid')

module.exports = {
  async index(request, response) {
    try {
      const product_id = request.query.product_id

      const questions = await connection('questions')
        .where('product_id', product_id)
        .select('*')

      return response.json(questions)
    } catch (err) {
      return response.json(`ERRO: ${err}`)
    }
  },

  async create(request, response) {
    try {
      const product_id = request.query.product_id
      const { user, question } = request.body
      const status = 'new'
      const id = uuid.v4()

      await connection('questions').insert({
        id,
        user,
        question,
        status,
        product_id,
      })
      return response.json({ id, status, question })
    } catch (err) {
      return response.json(`ERRO: ${err}`)
    }
  },

  async answer(request, response) {
    try {
      const product_id = request.query.product_id
      const question_id = request.query.question_id

      const { answer } = request.body
      const status = 'manual'

      await connection('questions')
        .where('product_id', product_id)
        .where('id', question_id)
        .update('status', status)
        .update('answer', answer)

      return response.json({ status, answer })
    } catch (err) {
      return response.status(400).send(err)
    }
  },
}
