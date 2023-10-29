const { add_ingeridient,  update_ingeridient, delete_ingeridient, selectAllIngeridient, get_unique_ingredient_categories, get_ingredients_by_category } = require("./ingredientsCrudFunctions");
const { getMenuItems, add_menu_item, update_menu_item, delete_menu_item, testFunc, get_unique_menu_categories, get_menu_items_by_category } = require("./menuCrudFunction");
const services = {
    test: {
        description: "test function",
        method: (event) => testFunc(event),
    },
    getAllMenuItems: {
        description: "fetch menu items from DB",
        method: () => getMenuItems()
    },
    // {"service":"getAllMenuItems"}
    get_menu_items_by_category: {
        description: "fetch menu items from DB",
        method: (event) => get_menu_items_by_category(event)
    },
    // {"service":"get_menu_items_by_category",'category': "Welcome Drinks"}
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
    get_unique_menu_categories: {
        description: "get unique menu category from DB",
        method: (event) => get_unique_menu_categories(event)
    },
    // {"service":"get_unique_menu_categories"}

    add_ingredient: {
        description: "add ingredient in DB",
        method: (event) => add_ingeridient(event)
    },
    // {"service":"add_ingredient","category":"testCategory", "item":"test_item","ratePerUnit":"11.1", "unit":"kg"}
    // {"service":"add_ingredient","category":"testCategory", "item":"test_item","ratePerUnit": "null", "unit":"kg"}
    selectAllIngeridient: {
        description: "select data base on category from DB",
        method: (event) => selectAllIngeridient(event)
    },
    // {"service":"selectAllIngeridient","category":"Bardana"}
    get_unique_ingredient_categories: {
        description: "select data base on category from DB",
        method: (event) => get_unique_ingredient_categories(event)
    },
    // {"service":"get_unique_ingredient_categories"}
    get_ingredients_by_category: {
        description: "select data base on category from DB",
        method: (event) => get_ingredients_by_category(event)
    },
    // {"service":"get_ingredients_by_category","category":"Ration"}
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