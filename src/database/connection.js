const knex = require('knex')
const configuration = require('../../knexfile')

const cloud = false

const config = cloud ? configuration.cloud : configuration.development

const connection = knex(config)

module.exports = connection
