const {
  add_event,
  update_event,
  selectEventColumn,
  copyEvent,
  eventFilter,
  delete_event,
} = require("./eventCrudFunction");
const {
  add_ingeridient,
  update_ingeridient,
  delete_ingeridient,
  selectAllIngeridient,
  get_unique_ingredient_categories,
  get_ingredients_by_category,
} = require("./ingredientsCrudFunctions");
const {
  getMenuItems,
  add_menu_item,
  update_menu_item,
  delete_menu_item,
  testFunc,
  get_unique_menu_categories,
  get_menu_items_by_category,
} = require("./menuCrudFunction");
const { report_filter } = require("./report");
const {
  addBill,
  billHistory,
  selectBillById,
  removeBillById,
} = require("./bill");
const services = {
  test: {
    description: "test function",
    method: (event) => testFunc(event),
  },
  getAllMenuItems: {
    description: "fetch menu items from DB",
    method: () => getMenuItems(),
  },
  // {"service":"getAllMenuItems"}
  get_menu_items_by_category: {
    description: "fetch menu items from DB",
    method: (event) => get_menu_items_by_category(event),
  },
  // {"service":"get_menu_items_by_category",'category': "Welcome Drinks"}
  add_menu_item: {
    description: "add menu category and  item to DB",
    method: (event) => add_menu_item(event),
  },
  // {"service":"add_menu_item","category":"test", "item":"testingg"}
  update_menu_item: {
    description: "update menu category and  item in DB",
    method: (event) => update_menu_item(event),
  },
  // {"service":"update_menu_item","id":1, "category":"test", "item":"testingg"}
  delete_menu_item: {
    description: "delete menu item from DB",
    method: (event) => delete_menu_item(event),
  },
  // {"service":"delete_menu_item","id":1}
  get_unique_menu_categories: {
    description: "get unique menu category from DB",
    method: (event) => get_unique_menu_categories(event),
  },
  // {"service":"get_unique_menu_categories"}

  add_ingredient: {
    description: "add ingredient in DB",
    method: (event) => add_ingeridient(event),
  },
  // {"service":"add_ingredient","category":"testCategory", "item":"test_item","ratePerUnit":"11.1", "unit":"kg"}
  // {"service":"add_ingredient","category":"testCategory", "item":"test_item","ratePerUnit": "null", "unit":"kg"}
  selectAllIngeridient: {
    description: "select data base on category from DB",
    method: () => selectAllIngeridient(),
  },
  // {"service":"selectAllIngeridient"}
  get_unique_ingredient_categories: {
    description: "select data base on category from DB",
    method: (event) => get_unique_ingredient_categories(event),
  },
  // {"service":"get_unique_ingredient_categories"}
  get_ingredients_by_category: {
    description: "select data base on category from DB",
    method: (event) => get_ingredients_by_category(event),
  },
  // {"service":"get_ingredients_by_category","category":"Ration"}
  update_ingeridient: {
    description: "update data base on id in DB",
    method: (event) => update_ingeridient(event),
  },
  // {"service":"update_ingeridient","id":352,"category":"testCategory", "item":"test_item","ratePerUnit": "null", "unit":"kg"}
  // {"service":"update_ingeridient","id":352,"category":"testCategory", "item":"test_item","ratePerUnit": "null", "unit":"kg"}
  delete_ingeridient: {
    description: "delete data base on id in DB",
    method: (event) => delete_ingeridient(event),
  },
  // {"service":"delete_ingeridient","id":352}

  // ------------------------------  EVENT   --------------------
  add_event: {
    description: "add event in DB",
    method: (event) => add_event(event),
  },
  // {"service":"add_event","query":  [  "Event Title","Organizer Name","Event Type","Event Address","Event Venue","2023-11-03 13:00:00","2023-11-03 15:00:00",100,"1234567890","1000","500","500","10","Additional Note"]}

  selectEventColumn: {
    description: "select event column based on ID from DB",
    method: (event) => selectEventColumn(event),
  },
  // {"service":"selectEventColumn","columns":  ["event_title","organizer","event_type","date_of_function"], "id": 5}

  update_event: {
    description: "add event in DB",
    method: (event) => update_event(event),
  },
  // {"service":"update_event","newEventData":  {"event_title": "aaaa","organizer": "New Organizer Name","event_type": "New Event Type","address": "New Event Address","venue": "New Event Venue","mobile_number": "000","booking_amount": "1200","menu": {"abc":123}}, "id": 5}
  copyEvent: {
    description: "copy event using ID",
    method: (event) => copyEvent(event),
  },
  // {"service":"copyEvent","id": 5}
  eventFilter: {
    description: "copy event using ID",
    method: (event) => eventFilter(event),
  },
  // { "service": "eventFilter", "event_type": "breakfast", "date_type": "date_of_booking", "event_title": "vij","organizer": "Vijay", "address": "c301", "mobile_number": "087",
  // "venue": "CMA","from_date": "2023-12-24","to_date": "2023-12-24"}
  delete_event: {
    description: "delete event using ID",
    method: (event) => delete_event(event),
  },
  // {"service":"delete_event","id": 1}

  report_filter: {
    description: "event filter for menu and ingredient",
    method: (event) => report_filter(event),
  },

  add_bill: {
    description: "add a bill details",
    method: (event) => addBill(event),
  },
  // {"service":"report_filter","column" :"menu","filter" : {"event_title": "zzz" ,"organizer": "New balaji" }}
  bill_history: {
    description: "get all bills",
    method: (event) => billHistory(event),
  },
  get_bill_by_id: {
    description: "get bill by id",
    method: (event) => selectBillById(event),
  },
  remove_bill_by_id: {
    description: "remove bill by id",
    method: (event) => removeBillById(event),
  },
};

async function checkServices(event) {
  console.log(event)
  if (event) {
    if (services[event.service]) {
      return await services[event.service]["method"](event);
    } else {
      throw new Error(`Error: [${event.service}] is not a valid service`);
    }
  } else {
    throw new Error("Not a valid request object");
  }
}

module.exports = { checkServices };
