const { executeQuery } = require("./postgres_connection");

async function add_event(event) {
  let values = event.query.map((value) => {
    if (typeof value === "string") {
      return `'${value}'`; // Wrap strings in single quotes
    }
    return value;
  });

  const sqlQuery = `
        SELECT insert_event(${values.join(", ")})
      `;
  executeQuery(sqlQuery);
}

async function update_event(event) {
  let setClause = "";
  for (const column in event.newEventData) {
    if (typeof event.newEventData[column] === "object") {
      setClause += ` ${column} = '${JSON.stringify(
        event.newEventData[column]
      )}',`;
    } else {
      setClause += ` ${column} = '${event.newEventData[column]}',`;
    }
  }
  setClause = setClause.slice(0, -1); // Remove trailing comma
  const sqlQuery = `UPDATE public.events SET ${setClause} WHERE id = ${event.id};`;
  executeQuery(sqlQuery);
}

async function selectEventColumn(event) {
  const columnsString = event.columns.join(", ");

  const sqlQuery = `
    SELECT ${columnsString} FROM events WHERE id = ${event.id};
  `;
  return await executeQuery(sqlQuery);
}

async function eventFilter(event) {
  const whereClause = [];
  if (event.event_type)
    whereClause.push(`event_type ILIKE '%${event.event_type}%'`);
  if (event.date_type && event.from_date && event.to_date)
    whereClause.push(
      `DATE(${event.date_type}) BETWEEN '${event.from_date}'::DATE AND '${event.to_date}'::DATE`
    );
  if (event.event_title)
    whereClause.push(`event_title ILIKE '%${event.event_title}%'`);
  if (event.organizer)
    whereClause.push(`organizer ILIKE '%${event.organizer}%'`);
  if (event.address) whereClause.push(`address ILIKE '%${event.address}%'`);
  if (event.mobile_number)
    whereClause.push(`mobile_number ILIKE '%${event.mobile_number}%'`);
  if (event.venue) whereClause.push(`venue ILIKE '%${event.venue}%'`);

  whereCondition =
    whereClause.length > 0 ? `WHERE ${whereClause.join(" AND ")}` : "";

  const query = `SELECT * FROM events ${whereCondition}`;
  console.log(query);
  return await executeQuery(query);
}

async function delete_event(event) {
  const sqlQuery = `DELETE FROM public.events
	WHERE  id = ${event.id};`;
  executeQuery(sqlQuery);
}

async function copyEvent(event) {
  const query = `INSERT INTO events (id, event_title, organizer, event_type, address, venue, date_of_booking, date_of_function, number_of_person, mobile_number, booking_amount, advance, balance, price_per_plate, note, menu, ingredient)
  SELECT (SELECT COALESCE(MAX(id), 0) + 1 FROM events), event_title, organizer, event_type, address, venue, date_of_booking, date_of_function, number_of_person, mobile_number, booking_amount, advance, balance, price_per_plate, note, menu, ingredient
  FROM events
  WHERE id = ${event.eventId} RETURNING id`;
  return await executeQuery(query);
}

module.exports = {
  add_event,
  update_event,
  selectEventColumn,
  copyEvent,
  eventFilter,
  delete_event,
};
