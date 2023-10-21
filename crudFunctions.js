const {executeQuery}=require("./postgres_connection");
function testFunc(event) {
    return {
        statusCode: 200,
        body: JSON.stringify(
            {
                message: "Go Serverless v3.0! Your function executed successfully!",
                input: event,
            },
            null,
            2
        ),
    };
}

async function addData(event) {
    var query_string = `INSERT INTO catering."CATERING_ORDERS"(
        "RATION", "BAKERY", "DAIRY", "DRESS", "PAANI", "BURF", "STALL", "SBJI", "OTHER", "ORDER_DATE", "CUSTOMER_NAME","CREATED_DATE")
        VALUES ('${JSON.stringify(event.ration)}','${JSON.stringify(event.bakery)}', '${JSON.stringify(event.dairy)}', '${JSON.stringify(event.dress)}','${JSON.stringify(event.paani)}', '${JSON.stringify(event.burf)}', '${JSON.stringify(event.stall)}', 
            '${JSON.stringify(event.sbji)}', '${JSON.stringify(event.other)}', '${event.order_date}', '${event.customer_name}',CURRENT_DATE)`
            console.log(query_string)
            // return
    await executeQuery(query_string);
    return true;
}

async function updateData(event) {
    var query_string=`UPDATE catering."CATERING_ORDERS"
	SET "RATION"='${JSON.stringify(event.ration)}', "BAKERY"='${JSON.stringify(event.bakery)}', "DAIRY"='${JSON.stringify(event.dairy)}', "DRESS"='${JSON.stringify(event.dress)}', "PAANI"='${JSON.stringify(event.paani)}', "BURF"='${JSON.stringify(event.burf)}', "STALL"='${JSON.stringify(event.stall)}', "SBJI"='${JSON.stringify(event.sbji)}', "OTHER"= '${JSON.stringify(event.other)}', "ORDER_DATE"='${event.order_date}', "CUSTOMER_NAME"='${event.customer_name}' 
	WHERE "CUSTOMER_NAME"='${event.customer_name}' and "ORDER_DATE"='${event.order_date}';`
    await executeQuery(query_string);
    return true;
}

async function getData(event){
    var query_string=`SELECT * FROM catering."CATERING_ORDERS"  WHERE "CUSTOMER_NAME"='${event.customer_name}' and "ORDER_DATE"='${event.order_date}';`
    return await executeQuery(query_string);
}

async function removeData(event){
    var query_string=`DELETE FROM catering."CATERING_ORDERS"
	WHERE "CUSTOMER_NAME"='${event.customer_name}' and "ORDER_DATE"='${event.order_date}';`
    return await executeQuery(query_string);
}
module.exports = { testFunc, addData, updateData,getData, removeData};