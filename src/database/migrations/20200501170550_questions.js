exports.up = async function (knex) {
  return await knex.schema.createTable('questions', table => {
    table.uuid('id').primary()
    table.string('user').notNullable()
    table.string('question').notNullable()
    table.string('status').notNullable()

    table.uuid('product_id').notNullable()
    table.foreign('product_id').references('id').inTable('products')

    table.uuid('answer_id')
    table.foreign('answer_id').references('id').inTable('answer')
  })
}

exports.down = async function (knex) {
  return await knex.schema.dropTable('questions')
}
