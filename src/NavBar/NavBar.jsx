import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';


import { Layout, Menu, Icon } from 'antd';


import { withRouter } from 'react-router-dom';
import Tab from '@material-ui/core/Tab';
import LinkTab from './LinkTab.jsx';

const {
  Header, Content, Footer, Sider,
} = Layout;

class NavBar extends Component {
  constructor( props ) {
    super( props );
    this.hanldeMenuClick = this.hanldeMenuClick.bind( this );
  }

  hanldeMenuClick( event ) {
    const { history, auth } = this.props;
    const lookup = {
      '/login': () => auth.login(),
      '/logout': () => auth.logout(),

    };

    const fn = lookup[event.key];
    if ( fn ) {
      fn();
    } else {
      history.push( event.key );
    }
  }

  render() {
    const {
      navPath, history, auth, loggedIn,
    } = this.props;
    return (
      <Sider
        breakpoint="lg"
        theme="dark"
        collapsible
        onBreakpoint={( broken ) => {
        }}
        onCollapse={( collapsed, type ) => {
        }}
      >
        <div className="logo" />
        <Menu theme="dark" mode="inline" onClick={this.hanldeMenuClick} selectedKeys={[navPath]}>
          <Menu.Item key="/home">
            <Icon type="home" />
            <span className="nav-text">Home</span>
          </Menu.Item>
          <Menu.Item key="/profile">
            <Icon type="user" />
            <span className="nav-text">Profile</span>
          </Menu.Item>
          <Menu.Item key="/private">
            <Icon type="lock" />
            <span className="nav-text">Private</span>
          </Menu.Item>
          <Menu.Item key="/info">
            <Icon type="info" />
            <span className="nav-text">Info</span>
          </Menu.Item>
          {!loggedIn && (
          <Menu.Item key="/login">
            <Icon type="login" />
            <span className="nav-text">Login</span>
          </Menu.Item>
          )}
          {loggedIn && (
          <Menu.Item key="/logout">
            <Icon type="logout" />
            <span className="nav-text">Logout</span>
          </Menu.Item>
          )}
        </Menu>
      </Sider>
    );
  }
}

function mapStateToProps( state ) {
  return {
    navPath: state.navState.navPath,
    loggedIn: state.authState.loggedIn,
  };
}

NavBar.propTypes = {
  navPath: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object.isRequired,
};

export default withRouter( connect( mapStateToProps )( NavBar ) );
