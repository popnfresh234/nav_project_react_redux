
exports.seed = function ( knex, Promise ) {
  // Deletes ALL existing entries
  return knex( 'recipes' ).del().then( () => knex.select( '*' )
    .from( 'users' ).limit( 3 ) )
    .then( result =>
      // Inserts seed entries
      knex( 'recipes' ).insert( [
        {
          name: 'Test Recipe',
          author: 'Test Author',
          category: 'Lunch',
          description: 'Not so good',
          duration: 12,
          image_url: 'pop',
          note: 'This is a note',
          user_id: result[0].id,
        },
        {
          name: 'Another Recipe',
          author: 'Test Author',
          category: 'Lunch',
          description: 'Not so good',
          duration: 12,
          image_url: 'pop',
          note: 'This is a note',
          user_id: result[1].id,
        },
        {
          name: 'A third Recipe',
          author: 'Test Author',
          category: 'Lunch',
          description: 'Not so good',
          duration: 12,
          image_url: 'pop',
          note: 'This is a note',
          user_id: result[2].id,
        },
      ] ) );
};
