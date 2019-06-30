const express = require( 'express' );

const router = express.Router();
const jwt = require( 'express-jwt' );
const jwks = require( 'jwks-rsa' );
require( 'dotenv' ).config();

const ENV = process.env.ENV || 'development';
const knexConfig = require( '../db/knexfile' );
const knex = require( 'knex' )( knexConfig[ENV] );


const jwtCheck = jwt( {
  secret: jwks.expressJwtSecret( {
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://dev-cw44eng7.auth0.com/.well-known/jwks.json',
  } ),
  audience: 'https://testapi/api',
  issuer: 'https://dev-cw44eng7.auth0.com/',
  algorithms: ['RS256'],
} );

router.get( '/public', ( req, res ) => {
  res.status( 200 ).send( 'These will eventually be recipes' );
} );

router.post( '/profile', jwtCheck, ( req, res ) => {
  const {
    at_hash, aud, exp, iat, iss, nonce, ...body
  } = req.body;
  knex.select()
    .from( 'users' )
    .where( 'sub', req.body.sub )
    .then( ( result ) => {
      if ( result.length === 0 ) {
        return knex( 'users' )
          .insert( body );
      }
      return result;
    } )
    .then( ( result ) => {
      res.status( 200 ).send( JSON.stringify( result[0] ) );
    } )
    .catch( ( err ) => {
      res.status( 500 ).send( 'Something went wrong' );
      console.log( err );
    } );
} );

router.get( '/private', jwtCheck, ( req, res ) => {
  // knex.select()
  //   .from( 'recipes' )
  //   .then( ( result ) => {
  //     res.status( 200 ).send( result );
  //   } ).catch( ( err ) => {
  //     console.log( err );
  //     res.status( 500 ).send( 'Something went wrong' );
  //   } );


  knex.raw(
    'select id, name, author, category, description, duration, image_url, note, r.user_id,'
    + 'COALESCE (sum(vote_flag),0) as vote_count '
    + 'FROM votes v '
    + 'RIGHT OUTER JOIN recipes r '
    + 'ON r.id = v.recipe_id '
    + 'GROUP BY r.id, name, author, category, description, duration, image_url, note, r.user_id '
    + 'ORDER BY vote_count DESC;',
  ).then( ( result ) => {
    res.status( 200 ).send( result.rows );
  } ).catch( ( err ) => {
    console.log( err );
  } );
} );

module.exports = router;
