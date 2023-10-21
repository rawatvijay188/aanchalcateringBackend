const {executeQuery}=require("./postgres_connection");

async function getMenuItems(){
    var query_string=`SELECT * FROM get_menu_items()`
    return await executeQuery(query_string);
}

async function add_menu_item(event){
    executeQuery(`SELECT catering.add_menu_item('${event.category}', '${event.item}')`)
}
async function update_menu_item(event){
    executeQuery(`SELECT catering.update_menu_details('${event.id}','${event.category}', '${event.item}')`)
}



module.exports ={getMenuItems,add_menu_item,update_menu_item}

