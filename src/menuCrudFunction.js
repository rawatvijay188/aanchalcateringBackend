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

async function getMenuItems(){
    var query_string=`SELECT * FROM get_menu_items()`
    return await executeQuery(query_string);
}

async function add_menu_item(event){
    executeQuery(`SELECT public.add_menu_item('${event.category}', '${event.item}')`)
}
async function update_menu_item(event){
    executeQuery(`SELECT public.update_menu_details('${event.id}','${event.category}', '${event.item}')`)
}

async function delete_menu_item(event){
    executeQuery(`SELECT public.delete_menu_item('${event.id}')`)
}



module.exports ={testFunc,getMenuItems,add_menu_item,update_menu_item, delete_menu_item}

