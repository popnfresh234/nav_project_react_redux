import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import { withRouter } from 'react-router-dom';
import Tab from '@material-ui/core/Tab';
import LinkTab from './LinkTab.jsx';

class NavBar extends Component {
  render() {
    const { navPos, history, auth } = this.props;
    return (
      <div>
        <AppBar position="static">
          <Tabs value={navPos}>
            <LinkTab label="Home" to="/home" history={history} />
            <LinkTab label="Profile" to="/profile" history={history} />
            <LinkTab label="Private" to="/private" history={history} />
            <LinkTab label="Info" to="/info" history={history} />
            {!auth.isAuthenticated() && (
            <Tab
              label="Login"
              onClick={( event ) => {
                auth.login();
              }}
            />
            )}

            {auth.isAuthenticated() && (
            <Tab
              label="Logout"
              onClick={( event ) => {
                auth.logout();
              }}
            />
            )}
          </Tabs>
        </AppBar>
      </div>
    );
  }
}

function mapStateToProps( state ) {
  return {
    navPos: state.navState.navPos,
  };
}

NavBar.propTypes = {
  navPos: PropTypes.number.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object.isRequired,
};

export default withRouter( connect( mapStateToProps )( NavBar ) );
