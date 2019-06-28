
exports.seed = function ( knex, Promise ) {
  // Deletes ALL existing entries
  return knex( 'votes' ).del()
    .then( () => knex.from( 'users' ).innerJoin( 'recipes', 'users.id', 'recipes.user_id' ) )
    .then( results => knex( 'votes' ).insert( [
      {
        recipe_id: results[0].id,
        user_id: results[0].user_id,
        vote_flag: 0,
      },
      {
        recipe_id: results[0].id,
        user_id: results[1].user_id,
        vote_flag: -1,
      },
      {
        recipe_id: results[0].id,
        user_id: results[2].user_id,
        vote_flag: 1,
      },
      {
        recipe_id: results[1].id,
        user_id: results[0].user_id,
        vote_flag: 1,
      },
      {
        recipe_id: results[1].id,
        user_id: results[1].user_id,
        vote_flag: 1,
      },
      {
        recipe_id: results[1].id,
        user_id: results[2].user_id,
        vote_flag: 1,
      },
    ] ) );
};

// Query for sum of votres for all recipes
// select recipe_id, sum(vote_flag) from votes group by recipe_id

// Query for sum of specific recipe
// select recipe_id, sum(vote_flag) from votes where recipe_id = 2 group by recipe_id

// Query for all data from specific recipe
// select id, name, author, category, description, duration, image_url, note, r.user_id, COALESCE (sum(vote_flag),0) as vote_count FROM votes v RIGHT OUTER JOIN recipes r ON r.id = v.recipe_id GROUP BY r.id, name, author, category, description, duration, image_url, note, r.user_id ORDER BY vote_count DESC;
