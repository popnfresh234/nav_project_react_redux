
exports.seed = function ( knex, Promise ) {
  // Deletes ALL existing entries
  return knex( 'users' ).del()
    .then( () =>
      // Inserts seed entries
      knex( 'users' ).insert( [
        {
          sub: '248289761001',
          name: 'Jane Josephine Doe',
          given_name: 'Jane',
          family_name: 'Doe',
          middle_name: 'Josephine',
          nickname: 'JJ',
          preferred_username: 'j.doe',
          profile: 'http://exampleco.com/janedoe',
          picture: 'http://exampleco.com/janedoe/me.jpg',
          website: 'http://exampleco.com',
          email: 'janedoe@exampleco.com',
          email_verified: true,
          gender: 'female',
          birthdate: '1972-03-31',
          zoneinfo: 'America/Los_Angeles',
          locale: 'en-US',
          phone_number: '+1 (111) 222-3434',
          phone_number_verified: false,
          updated_at: '1556845729',
        },
        {
          sub: '123',
          name: 'Alex',
          given_name: 'Alex',
          family_name: 'Holliday',
          middle_name: 'Josephine',
          nickname: 'JJ',
          preferred_username: 'j.doe',
          profile: 'http://exampleco.com/janedoe',
          picture: 'http://exampleco.com/janedoe/me.jpg',
          website: 'http://exampleco.com',
          email: 'janedoe@exampleco.com',
          email_verified: true,
          gender: 'female',
          birthdate: '1972-03-31',
          zoneinfo: 'America/Los_Angeles',
          locale: 'en-US',
          phone_number: '+1 (111) 222-3434',
          phone_number_verified: false,
          updated_at: '1556845729',
        },
        {
          sub: '456',
          name: 'Annie',
          given_name: 'Annie',
          family_name: 'Hsu',
          middle_name: 'Ko-Wei',
          nickname: 'JJ',
          preferred_username: 'j.doe',
          profile: 'http://exampleco.com/janedoe',
          picture: 'http://exampleco.com/janedoe/me.jpg',
          website: 'http://exampleco.com',
          email: 'janedoe@exampleco.com',
          email_verified: true,
          gender: 'female',
          birthdate: '1972-03-31',
          zoneinfo: 'America/Los_Angeles',
          locale: 'en-US',
          phone_number: '+1 (111) 222-3434',
          phone_number_verified: false,
          updated_at: '1556845729',
        },
      ] ) );
};

