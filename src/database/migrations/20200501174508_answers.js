exports.up = async function (knex) {
  return await knex.schema.createTable('answer', table => {
    table.uuid('id').primary()
    table.string('answer').notNullable()
    table.boolean('auto_answer')
    table.boolean('answer_quality')

    table.string('user').notNullable()

    table.uuid('product_id').notNullable()
    table.foreign('product_id').references('id').inTable('products')

    table.uuid('question_id')
    table.foreign('question_id').references('id').inTable('questions')
  })
}

exports.down = async function (knex) {
  return await knex.schema.dropTable('answer')
}
