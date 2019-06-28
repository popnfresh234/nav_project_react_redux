
exports.up = function ( knex, Promise ) {
  return knex.schema.createTable( 'users', ( t ) => {
    t.increments( 'id' ).primary();
    t.string( 'sub', 1000 ).unique();
    t.string( 'name', 1000 );
    t.string( 'given_name', 1000 );
    t.string( 'family_name', 1000 );
    t.string( 'middle_name', 1000 );
    t.string( 'nickname', 1000 );
    t.string( 'preferred_username', 1000 );
    t.string( 'profile', 1000 );
    t.string( 'picture', 1000 );
    t.string( 'website', 1000 );
    t.string( 'email', 1000 );
    t.boolean( 'email_verified' );
    t.string( 'gender', 1000 );
    t.string( 'birthdate', 1000 );
    t.string( 'zoneinfo', 1000 );
    t.string( 'locale', 1000 );
    t.string( 'phone_number', 1000 );
    t.boolean( 'phone_number_verified', 1000 );
    t.string( 'updated_at', 1000 );
  } );
};

exports.down = function ( knex, Promise ) {
  return knex.schema.dropTableIfExists( 'users' );
};


// const userSchema = {
//   sub: '248289761001',
//   name: 'Jane Josephine Doe',
//   given_name: 'Jane',
//   family_name: 'Doe',
//   middle_name: 'Josephine',
//   nickname: 'JJ',
//   preferred_username: 'j.doe',
//   profile: 'http://exampleco.com/janedoe',
//   picture: 'http://exampleco.com/janedoe/me.jpg',
//   website: 'http://exampleco.com',
//   email: 'janedoe@exampleco.com',
//   email_verified: true,
//   gender: 'female',
//   birthdate: '1972-03-31',
//   zoneinfo: 'America/Los_Angeles',
//   locale: 'en-US',
//   phone_number: '+1 (111) 222-3434',
//   phone_number_verified: false,
//   address: {
//     country: 'us',
//   },
//   updated_at: '1556845729',
// };
