const { executeQuery } = require("./postgres_connection");


async function add_event(event) {

    let values = event.query.map(value => {
        if (typeof value === 'string') {
            return `'${value}'`; // Wrap strings in single quotes
        }
        return value;
    });

    const sqlQuery = `
        SELECT insert_event(${values.join(', ')})
      `;
    executeQuery(sqlQuery)
}

async function update_event(event) {
    let setClause = '';
    for (const column in event.newEventData) {
        if (typeof event.newEventData[column] === 'object') {
            setClause += ` ${column} = '${JSON.stringify(event.newEventData[column])}',`;
        } else {
            setClause += ` ${column} = '${event.newEventData[column]}',`;
        }
    }
    setClause = setClause.slice(0, -1); // Remove trailing comma
    const sqlQuery = `UPDATE public.events SET ${setClause} WHERE id = ${event.id};`;
    executeQuery(sqlQuery);
}


async function selectEventColumn(event) {
    const columnsString = event.columns.join(', ');

    const sqlQuery = `
    SELECT ${columnsString} FROM events WHERE id = ${event.id};
  `;
    return await executeQuery(sqlQuery);
}
async function copyEvent(event) {

    const sqlQuery = `
  INSERT INTO events
  (id, event_title, organizer, event_type, address, venue, date_of_booking, date_of_function, number_of_person, 
   mobile_number, booking_amount, advance, balance, price_per_plate, note,menu, ingredient)
  SELECT 
    (SELECT max(id) + 1 FROM events), 
    event_title, 
    organizer, 
    event_type, 
    address, 
    venue, 
    date_of_booking, 
    date_of_function, 
    number_of_person, 
    mobile_number, 
    booking_amount, 
    advance, 
    balance, 
    price_per_plate, 
    note,menu, ingredient
  FROM events 
  WHERE id = ${event.id};
  `;
    executeQuery(sqlQuery);
}

async function eventFilter(event) {
    let whereClause = '';
    const values = [];

    for (const key in event.filter) {
        if (event.filter[key] !== undefined && event.filter[key] !== null) {
            whereClause += `${key} = '${event.filter[key]}' AND `;
            values.push(event.filter[key]);
        }
    }

    if (whereClause !== '') {
        whereClause = 'WHERE ' + whereClause.slice(0, -5); // Remove the last 'AND'
    }

    const sqlQuery = `SELECT id, event_title, organizer, event_type, address, venue, date_of_booking, date_of_function, number_of_person,
    mobile_number, booking_amount, advance, balance, price_per_plate, note FROM events ${whereClause}`;
    // return sqlQuery
    return await executeQuery(sqlQuery);
}

async function delete_event(event) {
    const sqlQuery = `DELETE FROM public.events
	WHERE  id = ${event.id};`;
    executeQuery(sqlQuery);
}

module.exports = { add_event, update_event, selectEventColumn, copyEvent, eventFilter, delete_event }