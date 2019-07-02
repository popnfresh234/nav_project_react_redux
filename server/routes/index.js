const express = require( 'express' );

const router = express.Router();
const jwt = require( 'express-jwt' );
const jwks = require( 'jwks-rsa' );
const fs = require( 'fs' );
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

router.post( '/profile', jwtCheck, ( req, res, next ) => {
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
      next( err );
    } );
} );

router.get( '/private/:sub', jwtCheck, ( req, res, next ) => {
  knex.select( 'id' )
    .from( 'users' )
    .where( 'sub', req.params.sub )
    .then( ( result ) => {
      if ( result[0] ) {
        return result[0].id;
      } throw new Error( 'No user found' );
    } )
    .then( ( userId ) => {
      let selectRecipesSql = fs.readFileSync( process.env.QUERY_ROOT + process.env.SELECT_RECIPES ).toString();
      selectRecipesSql = selectRecipesSql.replace( '?', userId );
      return knex.raw( selectRecipesSql ).then( result => result.rows );
    } )
    .then( ( result ) => {
      res.status( 200 ).send( result );
    } )
    .catch( ( err ) => {
      next( err );
    } );
} );

router.post( '/vote/:sub', jwtCheck, ( req, res, next ) => {
  let userId = '';
  console.log( req.body );
  knex.select( 'id' )
    .from( 'users' )
    .where( 'sub', req.params.sub )
    .then( ( userResult ) => {
      if ( userResult[0] ) {
        return userResult[0].id;
      } throw new Error( 'No User found' );
    } )
    .then( ( id ) => {
      userId = id;
      let insertVoteSql = fs.readFileSync( process.env.QUERY_ROOT + process.env.INSERT_VOTE ).toString();
      insertVoteSql = insertVoteSql.replace( /\$voteFlag/g, req.body.voteFlag ).replace( /\$recipeId/g, req.body.recipeId ).replace( /\$userId/g, userId );
      return knex.raw( insertVoteSql ).then( result => result );
    } )
    .then( ( ) => {
      let selectRecipesSql = fs.readFileSync( process.env.QUERY_ROOT + process.env.SELECT_RECIPES ).toString();
      selectRecipesSql = selectRecipesSql.replace( '?', userId );
      return knex.raw( selectRecipesSql ).then( result => result.rows );
    } )
    .then( ( recipeResults ) => {
      res.status( 200 ).send( recipeResults );
    } )
    .catch( ( err ) => {
      next( err );
    } );
} );

module.exports = router;
