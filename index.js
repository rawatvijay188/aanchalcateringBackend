
const mainprocess = require("./src/mainprocess");
exports.handler = async (event, context, callback) => {
  var body = JSON.parse(event.body);
  
  try {
    return  mainprocess.checkServices(body).then((responseBody)=>{
      var response={
        body:JSON.stringify(responseBody)
      }
      return response;
    });
  }
  catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(
        {
          message: error,
          input: event,
        },
        null,
        2
      ),
    };
  }
};
