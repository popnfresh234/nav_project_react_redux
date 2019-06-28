/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Profile extends Component {
  render() {
    const {
      profile, loading, rejected,
    } = this.props;

    return (
      <div>
        {rejected && (
        <h4>Something went wrong!</h4>
        )}

        {loading && (
          <h4>Loading</h4>
        )}

        {Object.keys( profile ).length > 0 && (
          <div>
            <img src={profile.picture} alt="Profile" />
            <h4>{profile.name}</h4>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ( {
  loading: state.authState.loading,
  rejected: state.authState.rejected,
  profile: state.authState.profile,
  errorMessage: state.authState.errorMessage,
  loggedIn: state.authState.loggedIn,
} );

export default connect( mapStateToProps )( Profile );
