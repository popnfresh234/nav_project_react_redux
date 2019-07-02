import React, { Component } from 'react';
import { List } from 'antd';

import axios from 'axios';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import RecipeListItem from '../Recipes/RecipeListItem.jsx';
import { recipesLoading, recipesSuccess, recipesRejected } from '../redux/actions/recipesActions';


class Private extends Component {
  componentDidMount() {
    const { authData } = this.props;
    if ( authData.accessToken ) {
      this.getRecipes();
    }
  }


  componentDidUpdate( prevProps ) {
    const { authData } = this.props;
    if ( authData.accessToken !== prevProps.authData.accessToken ) {
      this.getRecipes();
    }
  }

  getRecipes() {
    const {
      authData, recipesLoading, recipesSuccess, recipesRejected,
    } = this.props;
    const headers = {
      Authorization: `Bearer ${authData.accessToken}`,
    };
    recipesLoading();
    axios.get( `http://localhost:8081/api/private/${authData.sub}`, { headers } )
      .then( ( result ) => {
        recipesSuccess( result.data );
      } ).catch( ( err ) => {
        recipesRejected( err.response.data );
      } );
  }

  render() {
    const {
      loading, rejected, errorMessage, recipes = [], loggedIn,
    } = this.props;
    return (
      <Typography component="div" style={{ padding: 8 * 3 }}>
        {loading && (
          <h4>Loading</h4>
        )}

        {rejected && (
          <h4>{errorMessage}</h4>
        )}

        {loggedIn ? (
          <List
            itemLayout="vertical"
            bordered="true"
          >
            {recipes && !loading && recipes.map( recipe => (
              <RecipeListItem key={recipe.id} recipe={recipe} vote_count={recipe.vote_count} />
            ) )}
          </List>
        ) : ( <h4>Please Log In</h4> )}

      </Typography>
    );
  }
}

const mapStateToProps = state => ( {
  profile: state.authState.profile,
  authData: state.authState.authData,
  loading: state.recipesState.loading,
  rejected: state.recipesState.rejected,
  errorMessage: state.recipesState.errorMessage,
  recipes: state.recipesState.recipes,
  loggedIn: state.authState.loggedIn,
} );

const mapDispatchToProps = dispatch => ( {
  recipesLoading: () => dispatch( recipesLoading() ),
  recipesSuccess: recipes => dispatch( recipesSuccess( recipes ) ),
  recipesRejected: err => dispatch( recipesRejected( err ) ),
} );
export default connect( mapStateToProps, mapDispatchToProps )( Private );
