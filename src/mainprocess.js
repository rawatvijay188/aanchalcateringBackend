const { testFunc } = require("./crudFunctions");
const { getMenuItems, add_menu_item, update_menu_item, delete_menu_item } = require("./menuCrudFunction");
const services = {
    test: {
        description: "test function",
        method: (event) => testFunc(event),
    },
    getMenuItems: {
        description: "fetch menu items from DB",
        method: () => getMenuItems()
    },
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