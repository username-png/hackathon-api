
exports.up = async function(knex) {
  return await knex.schema.createTable('products', table => {
    table.uuid('id').primary()
    table.string('name').notNullable()
    table.integer('quantity').notNullable()
    table.jsonb('size').notNullable()
    table.string('color')
    table.float('price').notNullable()
    table.float('weight').notNullable()
    table.string('image').notNullable()
  })
};

exports.down = async function(knex) {
  return await knex.schema.dropTable('products')
};
