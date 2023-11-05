const { executeQuery } = require("./postgres_connection");

async function report_filter(event) {
    let whereClause = '';
    for (const key in event.filter) {
        if (!key.startsWith("date_of_function") && (event.filter[key] !== undefined && event.filter[key] !== null)) {
            whereClause += `${key} = '${event.filter[key]}' AND `;
        }
    }

    if (event.filter.date_of_function_from && event.filter.date_of_function_to) {
        whereClause += `date_of_function BETWEEN '${event.filter.date_of_function_from}' AND '${event.filter.date_of_function_to}' AND `;
        // values.push(event.date_of_function_from, event.date_of_function_to);
    }

    if (whereClause !== '') {
        whereClause = 'WHERE ' + whereClause.slice(0, -5); // Remove the last 'AND'
    }

    const sqlQuery = `SELECT ${event.column} FROM  public.events events ${whereClause};`;

    // return sqlQuery
    const results = await executeQuery(sqlQuery);

    // Consolidating the menu items and their quantities
    const consolidatedOutput = {};

    results.forEach(result => {
        const menu = result.menu;

        for (const menuItem in menu) {
            if (consolidatedOutput[menuItem]) {
                consolidatedOutput[menuItem] += menu[menuItem];
            } else {
                consolidatedOutput[menuItem] = menu[menuItem];
            }
        }
    });

    return consolidatedOutput;
}

module.exports = { report_filter }