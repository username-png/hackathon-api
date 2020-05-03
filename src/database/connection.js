const knex = require('knex')
const configuration = require('../../knexfile')
const path = require('path')
require('dotenv').config(path.join(__dirname, '..', '..'))
const { PRODUCTION } = process.env

const cloud = PRODUCTION

const config = cloud ? configuration.production : configuration.development

const connection = knex(config)

module.exports = connection
