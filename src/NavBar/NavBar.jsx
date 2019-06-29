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
    const { history } = this.props;
    history.push( event.key );
  }

  render() {
    const {
      navPath, history, auth, loggedIn,
    } = this.props;
    return (
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={( broken ) => {
          console.log( 'broken:', broken );
        }}
        onCollapse={( collapsed, type ) => {
          console.log( collapsed, type );
        }}
      >
        <div className="logo" />
        <Menu theme="dark" mode="inline" onClick={this.hanldeMenuClick} selectedKeys={[navPath]}>
          <Menu.Item key="/home">
            <Icon type="user" />
            <span className="nav-text">Home</span>
          </Menu.Item>
          <Menu.Item key="/profile">
            <Icon type="video-camera" />
            <span className="nav-text">Profile</span>
          </Menu.Item>
          <Menu.Item key="/private">
            <Icon type="upload" />
            <span className="nav-text">Private</span>
          </Menu.Item>
          <Menu.Item key="/info">
            <Icon type="user" />
            <span className="nav-text">Info</span>
          </Menu.Item>
        </Menu>
      </Sider>
    );

    //   return (
    //     <div>
    //       <AppBar position="static">
    //         <Tabs value={navPos}>
    //           <LinkTab label="Home" to="/home" history={history} />
    //           <LinkTab label="Profile" to="/profile" history={history} />
    //           <LinkTab label="Private" to="/private" history={history} />
    //           <LinkTab label="Info" to="/info" history={history} />
    //           {!loggedIn && (
    //           <Tab
    //             label="Login"
    //             onClick={( event ) => {
    //               auth.login();
    //             }}
    //           />
    //           )}

  //           {loggedIn && (
  //           <Tab
  //             label="Logout"
  //             onClick={( event ) => {
  //               auth.logout();
  //             }}
  //           />
  //           )}
  //         </Tabs>
  //       </AppBar>
  //     </div>
  //   );
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
