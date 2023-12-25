const { executeQuery } = require("./postgres_connection");

async function addBill(event) {
  const query = `
  INSERT INTO billing (bill_no, date, customer_name, gst, items, amount_details)
  SELECT
    COALESCE((SELECT count(*) + 1 FROM billing), 1), 
        '${event.date}', '${event.customerName}', '${
    event.gstNo
  }', '${JSON.stringify(event.items)}', '${JSON.stringify(
    event.amountDetails
  )}'`;
  executeQuery(query);
}

async function billHistory(event) {
  const query = `Select * from billing where DATE(date) BETWEEN '${event.from_date}'::DATE AND '${event.to_date}'::DATE`;
  return await executeQuery(query);
}

async function selectBillById(event) {
  const query = `select * from billing where bill_no='${event.billId}'`;
  return await executeQuery(query);
}

async function removeBillById(event) {
  const query = `delete from billing where bill_no='${event.billId}'`;
  executeQuery(query);
}

module.exports = {
  addBill,
  billHistory,
  selectBillById,
  removeBillById
};
