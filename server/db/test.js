require( 'dotenv' ).config();

const ENV = process.env.ENV || 'development';
const fs = require( 'fs' );
const knexConfig = require( './knexfile' );
const knex = require( 'knex' )( knexConfig[ENV] );


let sql = fs.readFileSync( './queries/insert_vote.sql' ).toString();
sql = sql.replace( /\$voteFlag/g, 0 );
console.log( sql );

// knex.raw( sql ).then( ( result ) => {
//   console.log( result.rows );
// } );
