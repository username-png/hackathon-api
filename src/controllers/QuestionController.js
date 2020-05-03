const connection = require('../database/connection')
const fs = require('fs')
const path = require('path')
const { asyncForEach } = require('../utils/functions')

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

  async index_all(request, response) {
    try {
      const resPerPage = request.query.resPerPage
      const questions = await connection('questions')
        .select('*')
        .limit(resPerPage || 10)

      return response.json(questions)
    } catch (err) {
      return response.json(`ERRO: ${err}`)
    }
  },

  async create(request, response) {
    try {
      const product_id = request.query.product_id
      const { user, question } = request.body
      const status = request.body.status
      const errorMsg = request.body.err

      const id = await connection('questions').insert(
        {
          user,
          question,
          status,
          product_id,
        },
        'id',
      )
      return response.json({ id, status, question, errorMsg })
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

  async checkIfSwearing(request, response, next) {
    const { question } = request.body
    let swearing = false
    let errorMsg = 'This question has swearing. Marking as spam...'

    const dataSet = fs
      .readFileSync(path.join(__dirname, '..', 'python', 'palavroes.csv'))
      .toString()
      .split(/[\n\r\;]+[^a-z]+/gi) // Read CSV as array
    const firstItem = dataSet[0].substr(2) // Fix bug at first item
    dataSet[0] = firstItem
    // console.dir(dataSet);

    await asyncForEach(dataSet, async (element, index) => {
      // const regexp = new RegExp(element, "g");
      // const regexp = /\b(\w*${element}\w*)\b/g;
      if (
        question.toLowerCase().includes(element.toLowerCase()) &&
        index !== dataSet.length // May be improved for Regex usage
      ) {
        // if (question.toLowerCase().match(regexp) && index !== (dataSet.length-1)) {
        swearing = true
        errorMsg += element
        // console.log(`${errorMsg} at ${index}`)
      }
    })

    if (swearing) {
      request.body.status = 'deleted'
      request.body.err = errorMsg
      return next()
    } else {
      request.body.status = 'new'
      request.body.err = ''
      return next()
    }
  },

  async getAwaitingCount(request, response) {
    try {
      const questions = await connection('questions')
        .where('status', 'waiting')
        .countDistinct()

      return response.json(questions)
    } catch (err) {
      return response.json(`ERRO: ${err}`)
    }
  },
}
