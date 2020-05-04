// Update with your config settings.
require('dotenv').config()
const { HOST, DATABASE, USER_DB, PASSWORD } = process.env

module.exports = {
  production: {
    client: 'postgresql',
    connection: {
      host: `${HOST}`,
      database: `${DATABASE}`,
      user: `${USER_DB}`,
      password: `${PASSWORD}`,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: './src/database/migrations',
    },
    useNullAsDefault: true,
  },
}
