const { executeQuery } = require("./postgres_connection");

async function report_filter(event) {
  const sqlQuery = `SELECT 
                    ing->>'item' AS item,
                    ing->>'category' AS category,
                    SUM((ing->>'quantity')::numeric) AS total_quantity,
                    MAX(ing->>'rate_per_unit') AS rate_per_unit
                FROM events,
                    LATERAL jsonb_array_elements(ingredient) AS ing
                WHERE DATE(date_of_function) BETWEEN '${
                  event.from_date
                }'::DATE AND '${event.to_date}'::DATE
                    AND event_title IN (${
                      "'" + event.event_title.join("', '") + "'"
                    })
                    AND (
                    jsonb_typeof(ingredient) = 'array'
                    AND EXISTS (
                        SELECT 1
                        FROM jsonb_array_elements(ingredient) AS ing
                        WHERE ing->>'category' IN (${
                          "'" + event.ingredient_categories.join("', '") + "'"
                        })
                    )
                    OR
                    jsonb_typeof(ingredient) = 'object'
                    AND ingredient->>'category' IN (${
                      "'" + event.ingredient_categories.join("', '") + "'"
                    })
                    )
                GROUP BY ing->>'item', ing->>'category';`;
  const results = await executeQuery(sqlQuery);
  return results;
}

module.exports = { report_filter };