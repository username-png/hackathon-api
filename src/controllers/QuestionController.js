const connection = require('../database/connection')
const uuid = require('uuid')
const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');
const { asyncForEach } = require('../utils/functions');

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

  async checkIfSwearing(request, response) {
    const { product_id, question_id } = request.query;
    /*let question = await connection('questions')
    .where('product_id', product_id)
    .where('id', question_id);
    console.dir(question);*/
    let question = "Qual foi seu merda?";
    let dataSet;
    let swearing = false;
    let errorMsg = "This question has swearing. Marking as spam...";

    dataSet = fs
      .readFileSync(path.join(__dirname, "..", "python", "palavroes.csv"))
      .toString()
      .split(/[\n\r\;]+[^a-z]+/gi);  // Read CSV as array
    const firstItem = dataSet[0].substr(2);  // Fix bug at first item
    dataSet[0] = firstItem;  
    //console.dir(dataSet);
  
    await asyncForEach(dataSet, async (element, index) => {
      //const regexp = new RegExp(element, "g");
      //const regexp = /\b(\w*${element}\w*)\b/g;
      if (
        question.toLowerCase().includes(element.toLowerCase()) &&
        index !== dataSet.length  // May be improved for Regex usage
      ) {
        //if (question.toLowerCase().match(regexp) && index !== (dataSet.length-1)) {
        swearing = true;
        errorMsg += element;
        console.log(errorMsg + " at " + index);
      }
    });

    if (swearing) {
      return response.status(202).send({ error: errorMsg, swearing });
    } else {
      return response
        .status(200)
        .send({ message: "Pergunta não possui palavras impróprias.", swearing });
    }
  },
};
