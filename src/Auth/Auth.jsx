// src/Auth/Auth.js

import auth0 from 'auth0-js';
import axios from 'axios';
import store from '../Index.jsx';
import {
  setLoggedIn, userProfileSuccess, userProfileLoading, userProfileRejected, setAuthData,
} from '../redux/actions/authActions';

class Auth {
  accessToken;

  idToken;

  expiresAt;

  auth0 = new auth0.WebAuth( {
    domain: 'dev-cw44eng7.auth0.com',
    clientID: 'p2bOhPxIX5yIx4fjInmEeNvR7D5dgksi',
    redirectUri: 'http://localhost:8080/callback',
    audience: 'https://testapi/api',
    responseType: 'token id_token',
    scope: 'openid profile email',
  } );


  constructor( history ) {
    this.history = history;
    this.login = this.login.bind( this );
    this.logout = this.logout.bind( this );
    this.handleAuthentication = this.handleAuthentication.bind( this );
    this.isAuthenticated = this.isAuthenticated.bind( this );
    this.getAccessToken = this.getAccessToken.bind( this );
    this.getIdToken = this.getIdToken.bind( this );
    this.getProfile = this.getProfile.bind( this );
    this.renewSession = this.renewSession.bind( this );
  }

  login() {
    this.auth0.authorize();
  }

  handleAuthentication() {
    this.auth0.parseHash( ( err, authResult ) => {
      if ( authResult && authResult.accessToken && authResult.idToken ) {
        this.setSession( authResult );
      } else if ( err ) {
        this.history.replace( '/home' );
        console.log( err );
      }
    } );
  }

  getAccessToken() {
    return this.accessToken;
  }

  getIdToken() {
    return this.idToken;
  }

  setSession( authResult, renew ) {
    localStorage.setItem( 'isLoggedIn', 'true' );
    store.dispatch( setLoggedIn( true ) );
    const expiresAt = ( authResult.expiresIn * 1000 ) + new Date().getTime();
    this.accessToken = authResult.accessToken;
    store.dispatch( setAuthData( { accessToken: authResult.accessToken, sub: authResult.idTokenPayload.sub } ) );
    this.idToken = authResult.idToken;
    this.expiresAt = expiresAt;
    store.dispatch( userProfileLoading() );
    this.getProfile()
      .then( ( profile ) => {
        store.dispatch( userProfileSuccess( profile ) );
        // navigate to the home route if not renewing
        if ( !renew ) {
          this.history.replace( '/home' ); // This takes us away from callback route
        }
      } )
      .catch( ( err ) => {
        store.dispatch( userProfileRejected( err.message ) );
        this.history.replace( '/home' );
      } );
  }

  // Get user profile
  getProfile() {
    return new Promise( ( resolve, reject ) => {
      this.auth0.client.userInfo( this.accessToken, ( err, profile ) => {
        if ( profile ) {
          this.userProfile = profile;
          const headers = {
            Authorization: `Bearer ${this.accessToken}`,
          };
          axios.post( 'http://localhost:8081/api/profile', profile, { headers } )
            .then( ( result ) => {
              resolve( result.data );
            } ).catch( ( error ) => {
              reject( error );
            } );
        }
      } );
    } );
  }

  renewSession() {
    this.auth0.checkSession( {}, ( err, authResult ) => {
      if ( authResult && authResult.accessToken && authResult.idToken ) {
        this.setSession( authResult, true );
      } else if ( err ) {
        this.logout();
        console.log( err );
      }
    } );
  }

  logout() {
    // remove tokens and expiry time
    this.accessToken = null;
    this.idToken = null;
    this.expiresAt = 0;

    // Remove user profile
    this.userProfile = null;

    // Remove isLoggedInFlag from local storage
    localStorage.removeItem( 'isLoggedIn' );
    store.dispatch( setLoggedIn( false ) );
    this.auth0.logout( {
      returnTo: window.location.origin,
    } );

    // Navigate to home route
    this.history.replace( '/home' );
  }

  isAuthenticated() {
    // Check whether the current time is past the access token's expiry time
    const { expiresAt } = this;
    return new Date().getTime() < expiresAt;
  }
}

export default Auth;
