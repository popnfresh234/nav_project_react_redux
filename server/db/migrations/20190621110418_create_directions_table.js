
exports.up = function ( knex, Promise ) {
  return knex.schema.createTable( 'directions', ( table ) => {
    table.increments( 'id' ).primary();
    table.string( 'description', 10000 ).notNull();
    table.integer( 'recipe_id' ).references( 'id' ).inTable( 'recipes' ).onDelete( 'CASCADE' );
  } );
};

exports.down = function ( knex, Promise ) {
  return knex.schema.dropTableIfExists( 'directions' );
};
