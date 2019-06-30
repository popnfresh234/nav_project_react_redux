SELECT
    id,
    name,
    author,
    category,
    duration,
    image_url,
    note,
    r.user_id AS author,
    (
        SELECT
            vote_flag as users_vote
        FROM
            votes
        WHERE
            user_id = 2
            AND r.id = recipe_id), COALESCE(sum(vote_flag), 0) AS vote_count
    FROM
        votes v
    RIGHT OUTER JOIN recipes r ON r.id = v.recipe_id
GROUP BY
    r.id,
    name,
    author,
    category,
    duration,
    image_url,
    note,
    r.user_id
ORDER BY
    vote_count DESC;

