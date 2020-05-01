const connection = require('../database/connection')

module.exports = {
  async index(request, response) {
    const product_id = request.headers.authorization

    const incidents = await connection('questions')
      .where('product_id', product_id)
      .select('*')

    return response.json(incidents)
  },
}
