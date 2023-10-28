const { add_ingeridient, select_ingeridient, update_ingeridient, delete_ingeridient } = require("./ingredientsCrudFunctions");
const { getMenuItems, add_menu_item, update_menu_item, delete_menu_item, testFunc } = require("./menuCrudFunction");
const services = {
    test: {
        description: "test function",
        method: (event) => testFunc(event),
    },
    getMenuItems: {
        description: "fetch menu items from DB",
        method: () => getMenuItems()
    },
    // {"service":"getMenuItems"}
    add_menu_item: {
        description: "add menu category and  item to DB",
        method: (event) => add_menu_item(event)
    },
    // {"service":"add_menu_item","category":"test", "item":"testingg"}
    update_menu_item: {
        description: "update menu category and  item in DB",
        method: (event) => update_menu_item(event)
    },
    // {"service":"update_menu_item","id":1, "category":"test", "item":"testingg"}
    delete_menu_item: {
        description: "delete menu item from DB",
        method: (event) => delete_menu_item(event)
    },
    // {"service":"delete_menu_item","id":1}
    add_ingredient: {
        description: "add ingredient in DB",
        method: (event) => add_ingeridient(event)
    },
    // {"service":"add_ingredient","category":"testCategory", "item":"test_item","ratePerUnit":"11.1", "unit":"kg"}
    // {"service":"add_ingredient","category":"testCategory", "item":"test_item","ratePerUnit": "null", "unit":"kg"}
    select_ingeridient: {
        description: "select data base on category from DB",
        method: (event) => select_ingeridient(event)
    },
    // {"service":"select_ingeridient","category":"Bardana"}
    update_ingeridient: {
        description: "update data base on id in DB",
        method: (event) => update_ingeridient(event)
    },
    // {"service":"update_ingeridient","id":352,"category":"testCategory", "item":"test_item","ratePerUnit": "null", "unit":"kg"}
    // {"service":"update_ingeridient","id":352,"category":"testCategory", "item":"test_item","ratePerUnit": "null", "unit":"kg"}
    delete_ingeridient: {
        description: "delete data base on id in DB",
        method: (event) => delete_ingeridient(event)
    },
    // {"service":"delete_ingeridient","id":352}
}

async function checkServices(event) {
    if (event) {
        if (services[event.service]) {
            return await services[event.service]["method"](event);
        }
        else {
            throw new Error(`Error: [${event.service}] is not a valid service`)
        }
    }
    else {
        throw new Error("Not a valid request object");
    }
}

module.exports = { checkServices }