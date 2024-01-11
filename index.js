const mainprocess = require("./src/mainprocess");

exports.handler = async (event) => {
  const headers = {
    "Access-Control-Allow-Origin": "*", // or specify your allowed origins
    "Access-Control-Allow-Headers":
      "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,auth-token",
    "Access-Control-Allow-Methods": "GET,OPTIONS,POST,PUT,DELETE",
    "Access-Control-Expose-Headers": "Access-Control-Allow-Origin",
  };

  try {
    // Parse the body only if it exists
    const body = event.body ? JSON.parse(event.body) : {};
    console.log(body);

    // Process regular requests using mainprocess.checkServices
    const responseBody = await mainprocess.checkServices(body);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(responseBody),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify(
        {
          message: error.message || "Internal Server Error",
          input: event,
        },
        null,
        2
      ),
    };
  }
};
