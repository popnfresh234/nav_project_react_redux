import React, { Component } from 'react';
import { List } from 'antd';

import axios from 'axios';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import RecipeListItem from '../Recipes/RecipeListItem.jsx';
import { recipesLoading, recipesSuccess, recipesRejected } from '../redux/actions/recipesActions';


class Private extends Component {
  componentDidMount() {
    const { accessToken } = this.props;
    if ( accessToken ) {
      this.getRecipes();
    }
  }


  componentDidUpdate( prevProps ) {
    const { accessToken } = this.props;

    if ( accessToken !== prevProps.accessToken ) {
      this.getRecipes();
    }
  }

  getRecipes() {
    const {
      accessToken, recipesLoading, recipesSuccess, recipesRejected,
    } = this.props;
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };
    recipesLoading();
    axios.get( 'http://localhost:8081/api/private', { headers } )
      .then( ( result ) => {
        recipesSuccess( result.data );
      } ).catch( ( err ) => {
        recipesRejected( err );
      } );
  }

  render() {
    const {
      loading, rejected, errormessage, recipes, loggedIn,
    } = this.props;

    return (
      <Typography component="div" style={{ padding: 8 * 3 }}>
        {loading && (
          <h4>Loading</h4>
        )}

        {rejected && (
          <h4>Something went wrong!</h4>
        )}

        {loggedIn ? (
          <List
            itemLayout="vertical"
            bordered="true"
          >
            {recipes && recipes.map( recipe => (
              <RecipeListItem key={recipe.id} recipe={recipe} vote_count={recipe.vote_count} />
            ) )}
          </List>
        ) : ( <h4>Please Log In</h4> )}

      </Typography>
    );
  }
}

const mapStateToProps = state => ( {
  accessToken: state.authState.accessToken,
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
