const dotenv = require( 'dotenv' );

dotenv.config( { path: '../.env' } ); // Set path to ENV file

module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT,
      ssl: process.env.DB_SSL,
    },
    migrations: {
      directory: './migrations',
      tableName: 'migrations',
    },
    seeds: {
      directory: './seeds',
    },
  },
};

