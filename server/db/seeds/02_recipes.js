
exports.seed = function ( knex, Promise ) {
  // Deletes ALL existing entries
  return knex( 'recipes' ).del().then( () => knex.select( '*' )
    .from( 'users' ).limit( 3 ) )
    .then( result =>
      // Inserts seed entries
      knex( 'recipes' ).insert( [
        {
          name: 'Kung Pao Chicken',
          author: 'Annie Hsu',
          category: 'Dinner',
          description: 'Delicious Kung Pao Chicken with Oyster sauce, hot peppers and green onions',
          duration: 12,
          image_url: 'pop',
          note: 'This is a note',
          user_id: result[0].id,
        },
        {
          name: 'Rosemary Chicken',
          author: 'Douglas Holliday',
          category: 'Lunch',
          description: 'A deep fried boneless skinless chicken thigh with rosemarry flavored batter',
          duration: 12,
          image_url: 'pop',
          note: 'This is a note',
          user_id: result[1].id,
        },
        {
          name: 'Exploding Green Onion Beef',
          author: 'Alex Holliday',
          category: 'Dinner',
          description: 'Juicy slices of beef with garlic, green onions, and onions',
          duration: 12,
          image_url: 'pop',
          note: 'This is a note',
          user_id: result[2].id,
        },
      ] ) );
};
