const { executeQuery } = require("./postgres_connection");


async function select_ingeridient(event) {
  try {
    console.log(`SELECT * FROM public.get_ingredients_by_category('${event.category}')`);
    let data = await executeQuery(`SELECT * FROM public.get_ingredients_by_category('${event.category}')`);
    return data
  } catch (error) {
    console.error('Error executing function:', error);
  }
}

async function add_ingeridient(event) {
  try {
    let ratePerUnit = event.ratePerUnit;

    if (ratePerUnit === null || !isNaN(ratePerUnit)) {
      ratePerUnit = parseFloat(ratePerUnit);
    } else {
      ratePerUnit = null;
    }

    executeQuery(`SELECT public.add_ingredient('${event.category}', '${event.item}', '${event.unit}', ${ratePerUnit})`);

  } catch (error) {
    console.error('Error executing function:', error);
  }
}

async function update_ingeridient(event) {
  try {

    let ratePerUnit = event.ratePerUnit;

    if (ratePerUnit === null || !isNaN(ratePerUnit)) {
      ratePerUnit = parseFloat(ratePerUnit);
    } else {
      ratePerUnit = null;
    }
    executeQuery(`SELECT public.update_ingredient_by_id('${event.id}','${event.category}', '${event.item}', ${ratePerUnit}, '${event.unit}')`);

  } catch (error) {
    console.error('Error executing function:', error);
  }
}
async function delete_ingeridient(event) {
  try {
  
    executeQuery(`SELECT public.delete_ingredient_by_id(${event.id})`);

  } catch (error) {
    console.error('Error executing function:', error);
  }
}


module.exports = { add_ingeridient, select_ingeridient,update_ingeridient,delete_ingeridient }