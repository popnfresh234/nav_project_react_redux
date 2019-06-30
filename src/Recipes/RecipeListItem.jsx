import React, { Component } from 'react';
import { List, Icon } from 'antd';

class RecipeListItem extends Component {
  constructor( props ) {
    super( props );
    this.onVoteClicked = this.onVoteClicked.bind( this );
  }

  onVoteClicked( event, recipe ) {
    console.log( recipe );
  }

  render() {
    const { recipe } = this.props;
    const IconText = ( {
      type, theme, text, thisRecipe,
    } ) => (
      <span>
        <Icon type={type} theme={theme} style={{ marginRight: 8, color: '#db5817' }} onClick={e => this.onVoteClicked( e, thisRecipe )} />
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


export default RecipeListItem;
