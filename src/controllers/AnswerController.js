const uuid = require('uuid')
const connection = require('../database/connection')

module.exports = {
  async find(request, response) {
    try {
      const product_id = request.headers.product_id
      const question_id = request.headers.question_id

      const answer = await connection('answer')
        .where('product_id', product_id)
        .where('question_id', question_id)
        .select('*')

      return response.json(answer)
    } catch (err) {
      return response.status(400).send(err)
    }
  },

  async create(request, response) {
    try {
      const product_id = request.headers.product_id
      const question_id = request.headers.question_id

      // const findAnswer = this.find(request, response)

      // if (findAnswer) {
      // throw new Error('Allready answer')
      // }

      const { answer, auto_answer, user } = request.body

      const id = uuid.v4()

      await connection('answer')
        .whereNotExists('product_id')
        .whereNotExists('question_id')
        .insert({
          id,
          answer,
          auto_answer,
          user,
          product_id,
          question_id,
        })

      console.log('criou ?!')

      return response.json({ id, answer })
    } catch (err) {
      return response.status(400).send(err)
    }
  },
}
