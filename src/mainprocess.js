const { testFunc } = require("./crudFunctions");
const { getMenuItems, add_menu_item } = require("./menuCrudFunction");
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