import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import NavBar from './NavBar/NavBar.jsx';
import Home from './Pages/Home.jsx';
import Private from './Pages/Private.jsx';
import Profile from './Pages/Profile.jsx';
import Info from './Pages/Info.jsx';
import { setNavPosition } from './navActions';
import Auth from './Auth/Auth.jsx';
import Callback from './Auth/Callback.jsx';

class App extends Component {
  constructor( props ) {
    super( props );
    this.auth = new Auth( props.history );
    this.handleAuthentication = this.handleAuthentication.bind( this );
  }

  componentDidMount() {
    this.handleNav( );
  }

  componentDidUpdate() {
    this.handleNav( );
  }

  handleAuthentication = ( nextState, replace ) => {
    if ( /access_token|id_token|error/.test( nextState.location.hash ) ) {
      this.auth.handleAuthentication();
    }
  };


  handleNav( ) {
    const { setNavPos, history } = this.props;
    setNavPos( history.location.pathname );
  }

  render() {
    return (
      <div>
        <NavBar auth={this.auth} />
        <Switch>
          <Route
            path="/home"
            exact
            render={props => (
              <Home {...props} />
            )}
          />
          <Route
            path="/profile"
            exact
            render={props => (
              <Profile auth={this.auth} {...props} />
            )}
          />
          <Route
            path="/private"
            exact
            render={props => (
              <Private {...props} />
            )}
          />
          <Route
            path="/info"
            exact
            render={props => (
              <Info {...props} />
            )}
          />

          <Route
            path="/callback"
            exact
            render={( props ) => {
              this.handleAuthentication( props );
              return <Callback {...props} />;
            }}
          />
        </Switch>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => ( {
  setNavPos: pos => dispatch( setNavPosition( pos ) ),
} );

App.propTypes = {
  setNavPos: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object.isRequired,
};

export default withRouter( connect( null, mapDispatchToProps )( App ) );
