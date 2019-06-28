
exports.up = function ( knex, Promise ) {
  return knex.schema.createTable( 'recipes', ( t ) => {
    t.increments( 'id' ).primary();
    t.string( 'name', 10000 );
    t.string( 'author', 10000 );
    t.string( 'category', 10000 );
    t.string( 'description', 10000 );
    t.integer( 'duration' );
    t.string( 'image_url', 10000 );
    t.string( 'note', 10000 );
    t.integer( 'user_id' ).unsigned().references( 'id' ).inTable( 'users' )
      .onDelete( 'CASCADE' );
  } );
};

exports.down = function ( knex, Promise ) {
  return knex.schema.dropTableIfExists( 'recipes' );
};

