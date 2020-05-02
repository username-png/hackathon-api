const uuid = require('uuid')
const connection = require('../database/connection')
const path = require('path')
const fs = require('fs')

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
  async json_import(request, response) {
    // try {
    const tempDir = path.join('/../tmp', request.file.filename)

    console.log(tempDir) // home/nathan/src/tmp

    // const file = path.join(tempDir, request.file.filename)
    const obj = fs.stat(tempDir, function (err, stats) {
      if (err) throw Error
      console.log(stats)
    })
    console.log(obj)

    return response.json(obj)
    // } catch (err) {
    // return response.status(400).json(err)
    // }
  },
}
