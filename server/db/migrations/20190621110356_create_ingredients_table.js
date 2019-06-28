
exports.up = function ( knex, Promise ) {
  return knex.schema.createTable( 'ingredients', ( table ) => {
    table.increments( 'id' ).primary();
    table.string( 'name', 10000 ).notNull();
    table.string( 'units', 10000 ).notNull();
    table.float( 'quantity' ).notNull();
    table.integer( 'recipe_id' ).references( 'id' ).inTable( 'recipes' ).onDelete( 'CASCADE' );
    table.integer( 'user_id' ).references( 'id' ).inTable( 'users' ).onDelete( 'CASCADE' );
  } );
};

exports.down = function ( knex, Promise ) {
  return knex.schema.dropTableIfExists( 'ingredients' );
};
