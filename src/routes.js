const validateToken = require('./middlewares/tokens')
const express = require('express')
const { MeliObject } = require('./utils')
require('dotenv').config()

const { PASSWORD } = process.env

const routes = express.Router()

routes.post('/login', (req, res) => {
  if (req.body.password === PASSWORD) {
    req.session.user = true
    res.json({ ok: true })
  } else {
    res.json({ ok: false })
  }
})

routes.get('/profile', validateToken, async (req, res) => {
  try {
    const meliObject = new MeliObject(res.locals.access_token)
    const user = await meliObject.get('/users/me')
    const categories = await meliObject.get(`/sites/${user.site_id}/categories`)
    const currencies = await meliObject.get('/currencies')
    const listing_types = await meliObject.get(
      `/sites/${user.site_id}/listing_types`,
    )
    res.send().json({
      user,
      categories,
      currencies,
      listing_types,
    })
  } catch (err) {
    console.log('Something went wrong', err)
    res.status(500).send(`Error! ${err}`)
  }
})

module.exports = routes
