const connection = require('../database/connection')
const uuid = require('uuid')

module.exports = {
  async index(request, response) {
    try {
      const product_id = request.headers.product_id

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
      const product_id = request.headers.product_id
      const { user, question } = request.body
      const status = 'waiting'
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

  async update(request, response) {
    try {
      const product_id = request.headers.product_id
      const question_id = request.headers.question_id
      const answer_id = request.headers.answer_id

      if (!answer_id) {
        throw new Error('FALTOU O ID DA PERGUNTA')
      }
      const { status } = request.body

      await connection('questions')
        .where('product_id', product_id)
        .where('id', question_id)
        .update('status', status)
        .update('answer_id', answer_id)

      return response.json({ status, answer_id })
    } catch (err) {
      return response.status(500).send(err)
    }
  },
}
