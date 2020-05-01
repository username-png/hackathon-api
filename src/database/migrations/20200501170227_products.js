
exports.up = async function(knex) {
  return await knex.schema.createTable('products', table => {
    table.uuid('id').primary()
    table.string('name').notNullable()
    table.integer('quantity').notNullable()
    table.float('price').notNullable()
    table.json('size')
    table.string('color')
    table.float('weight')
    table.string('image')
  })
};

exports.down = async function(knex) {
  return await knex.schema.dropTable('products')
};
