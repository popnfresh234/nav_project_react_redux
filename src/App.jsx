import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Layout } from 'antd';
import NavBar from './NavBar/NavBar.jsx';
import Home from './Pages/Home.jsx';
import Private from './Pages/Private.jsx';
import Profile from './Pages/Profile.jsx';
import Info from './Pages/Info.jsx';
import { setNavPath } from './redux/actions/navActions';
import Auth from './Auth/Auth.jsx';
import Callback from './Auth/Callback.jsx';

const {
  Header, Content, Footer,
} = Layout;

class App extends Component {
  constructor( props ) {
    super( props );
    this.auth = new Auth( props.history );
    this.handleAuthentication = this.handleAuthentication.bind( this );
  }

  componentDidMount() {
    this.handleNav( );

    if ( localStorage.getItem( 'isLoggedIn' ) === 'true' ) {
      this.auth.renewSession();
    }
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
    const { setNavPath, history } = this.props;
    setNavPath( history.location.pathname );
  }

  render() {
    return (

      <Layout>
        <NavBar auth={this.auth} />
        <Layout style={{ minHeight: '100vh' }}>
          <Header style={{ background: '#fff', padding: 0, textAlign: 'center' }}>
            Recipe Voting App
          </Header>
          <Content style={{ margin: '24px 16px 0' }}>
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
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>

    );
  }
}
const mapDispatchToProps = dispatch => ( {
  setNavPath: pos => dispatch( setNavPath( pos ) ),
} );

App.propTypes = {
  setNavPath: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object.isRequired,
};

export default withRouter( connect( null, mapDispatchToProps )( App ) );
