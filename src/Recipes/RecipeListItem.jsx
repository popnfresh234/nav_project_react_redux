import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List, Icon } from 'antd';
import axios from 'axios';

import {
  recipesLoading, recipesSuccess, recipesRejected, setVoted,
} from '../redux/actions/recipesActions';

class RecipeListItem extends Component {
  constructor( props ) {
    super( props );
    this.onVoteClicked = this.onVoteClicked.bind( this );
  }

  onVoteClicked( event, recipe ) {
    const {
      authData, recipesLoading, recipesSuccess, recipesRejected,
    } = this.props;
    console.log( recipe.user_voted );
    // Build vote
    let voteFlag = recipe.user_voted;

    if ( !voteFlag || voteFlag === 0 ) {
      voteFlag = 1;
    } else voteFlag = 0;

    const vote = {
      recipeId: recipe.id,
      voteFlag,
    };


    // Send in vote
    const headers = {
      Authorization: `Bearer ${authData.accessToken}`,
    };


    recipesLoading();
    axios.post( `http://localhost:8081/api/vote/${authData.sub}`, vote, { headers } )
      .then( ( result ) => {
        recipesSuccess( result.data );
      } ).catch( ( err ) => {
        recipesRejected( err.response.data );
      } );
  }

  render() {
    const { recipe } = this.props;
    let likeStyleName = '';
    if ( recipe.user_voted ) {
      likeStyleName = 'primary-color';
    }
    const IconText = ( {
      type, theme, text, thisRecipe,
    } ) => (
      <span>
        <Icon className={likeStyleName} type={type} theme={theme} style={{ marginRight: 8 }} onClick={e => this.onVoteClicked( e, thisRecipe )} />
        {text}
      </span>
    );


    return (
      <List.Item
        actions={[
          <IconText type="like" theme="filled" text={recipe.vote_count} thisRecipe={recipe} />,
        ]}
      >
        <List.Item.Meta
          title={recipe.name}
          description={recipe.description}
        />

      </List.Item>
    );
  }
}

const mapStateToProps = state => ( {
  loggedIn: state.authState.loggedIn,
  authData: state.authState.authData,
} );

const mapDispatchToPros = dispatch => ( {
  recipesLoading: () => dispatch( recipesLoading() ),
  recipesSuccess: recipes => dispatch( recipesSuccess( recipes ) ),
  recipesRejected: err => dispatch( recipesRejected( err ) ),
  setVote: voted => dispatch( setVoted( voted ) ),
} );

export default connect( mapStateToProps, mapDispatchToPros )( RecipeListItem );
