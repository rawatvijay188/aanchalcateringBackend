const { testFunc } = require("./crudFunctions");
const { getMenuItems } = require("./menuCrudFunction");
const services = {
    test: {
        description: "test function",
        method: (event) => testFunc(event),
    },
    getMenuItems: {
        description: "fetch menu items from DB",
        method: () => getMenuItems()
    },

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