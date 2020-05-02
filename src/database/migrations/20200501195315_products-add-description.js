exports.up = async function (knex) {
  return await knex.schema.table('products', table => {
    table.dropColumn('size')
    table.float('width')
    table.float('height')
    table.float('lenght')
    table.string('description')
  })
}

exports.down = async function (knex) {
  return await knex.schema.table('products', table => {
    table.dropColumn('description')
    table.dropColumn('lenght')
    table.dropColumn('height')
    table.dropColumn('width')
    table.json('size')
  })
}
