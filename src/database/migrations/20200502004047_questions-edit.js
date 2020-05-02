exports.up = async function (knex) {
  return await knex.schema.table('questions', table => {
    table.dropColumn('answer_id')
    table.string('answer')
    table.boolean('is_good')
  })
}

exports.down = async function (knex) {
  return await knex.schema.table('questions', table => {
    table.dropColumn('answer')
    table.dropColumn('is_good')
    table.uuid('answer_id')
    table.foreign('answer_id').references('id').inTable('answer')
  })
}
