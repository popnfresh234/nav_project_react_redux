import React, { Component } from 'react';


class Profile extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      profile: {},
    };
  }

  componentDidMount() {
    const { auth } = this.props;
    if ( auth.isAuthenticated() ) {
      if ( !auth.userProfile ) {
        auth.getProfile( ( err, profile ) => {
          this.setState( { profile } );
        } );
      } else {
        const profile = auth.userProfile;
        this.setState( { profile } );
      }
    }
  }

  render() {
    const { auth } = this.props;

    return (
      auth.isAuthenticated() ? (
        <div>
          <img src={this.state.profile.picture} />
          <h4>{this.state.profile.name}</h4>
        </div>
      ) : (
        <h4>This is a private route</h4>
      )

    );
  }
}

export default Profile;
