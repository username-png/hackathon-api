const meli = require('mercadolibre')
require('dotenv').config()

const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } = process.env

const tokens = {
  access_token: null,
  expires: null,
}

const setTokens = newTokens => {
  const date = new Date()
  const timeThreshold = 6 // o token do mercadolivre dura até 6 horas
  date.setHours(date.getHours() + timeThreshold, 0, 0, 0)
  tokens.expires = date
  tokens.access_token = newTokens.access_token
}

const validateToken = (req, res, next) => {
  if (req.session.user) {
    if (!tokens.access_token || new Date() >= tokens.expires) {
      const redirectUri = REDIRECT_URI + req.baseUrl + req.path
      const { code } = req.query
      const meliObject = new meli.Meli(CLIENT_ID, CLIENT_SECRET)
      if (code) {
        meliObject.authorize(code, redirectUri, (error, response) => {
          if (error) {
            throw error
          }
          setTokens(response)
          res.locals.access_token = tokens.access_token
          res.redirect(redirectUri)
        })
      } else {
        res.redirect(meliObject.getAuthURL(redirectUri))
      }
    } else {
      res.locals.access_token = tokens.access_token
      next()
    }
  } else {
    res.redirect('/')
  }
}

module.exports = validateToken
