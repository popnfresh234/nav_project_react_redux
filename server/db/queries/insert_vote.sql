INSERT INTO votes (recipe_id, user_id, vote_flag)
        VALUES ('$recipeId', '$userId', '$voteFlag') ON CONFLICT (recipe_id, user_id)
        DO
        UPDATE
        SET
            (recipe_id, user_id) = ('$recipeId', '$userId'), vote_flag = '$voteFlag';
