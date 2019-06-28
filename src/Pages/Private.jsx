import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import { recipesLoading, recipesSuccess, recipesRejected } from '../redux/actions/recipesActions';


class Private extends Component {
  componentDidUpdate( prevProps ) {
    const {
      accessToken, recipes, recipesLoading, recipesSuccess,
    } = this.props;

    if ( accessToken !== prevProps.accessToken ) {
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
  }

  render() {
    const {
      loading, rejected, errormessage, recipes,
    } = this.props;
    return (
      <Typography component="div" style={{ padding: 8 * 3 }}>
        {loading && (
          <h4>Loading</h4>
        )}

        {rejected && (
          <h4>Something went wrong!</h4>
        )}

        {recipes && recipes.map( recipe => (

          <h4 key={recipe.id}>
            {recipe.name}
            {' '}
            Vote Count:
            {' '}
            {recipe.vote_count}
          </h4>
        ) )}
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
} );

const mapDispatchToProps = dispatch => ( {
  recipesLoading: () => dispatch( recipesLoading() ),
  recipesSuccess: recipes => dispatch( recipesSuccess( recipes ) ),
} );
export default connect( mapStateToProps, mapDispatchToProps )( Private );
