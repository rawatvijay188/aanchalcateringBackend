const {executeQuery}=require("./postgres_connection");
async function getMenuItems(){
    console.log("inside getMenuItems function");
    // var query_string=`SELECT * FROM get_menu_items()`
    var query_string=`SELECT id, category, item
	FROM public.menu`
    return await executeQuery(query_string);
}

module.exports ={getMenuItems}