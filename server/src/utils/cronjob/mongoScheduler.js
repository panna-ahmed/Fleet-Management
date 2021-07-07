const { Vehicles } = require("../../models/Vehicles"), // Mongo model for the vehicles
  { fetchApiData } = require("./fetchApiData"); // this is a function to reqtrieve data from API

const passport = require("passport");

async function refreshToken() {
  const postData = {
    // Pass a simple key-value pair
    grant_type: "refresh_token",
    refresh_token: global.refreshToken,
  };

  let encodedData = Buffer.from(
    process.env.CLIENT_ID + ":" + process.env.CLIENT_SECRET
  ).toString("base64");

  let refreshOptions = {
    url: process.env.TOKEN_URL,
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + encodedData,
    },
    form: { grant_type: "refresh_token", refresh_token: global.refreshToken },
  };

  let { access_token, refresh_token } = await fetchApiData(refreshOptions);
  global.accessToken = access_token;
  global.refreshToken = refresh_token;

  console.log("Access Token retrieved by refreshing.");
}

async function mongoScheduler() {
  console.log("Scheduler started");

  try {
    await refreshToken();
    // defining api options
    let options = {
      url: `${process.env.SWAGGER_CLIENT_API}`,
      method: "GET",
      headers: {
        Accept: "application/json",
        "Accept-Charset": "utf-8",
        Authorization: "Bearer " + global.accessToken,
      },
    };

    // retrieving all vehicles from API
    let allVehiclesInApi = await fetchApiData(options);

    // retrieving all vehicles from Mongo
    let allVehiclesInMongo = await Vehicles.find({});

    // checking if vehicles found in API
    if (allVehiclesInApi) {
      // accessing index 0 vehicle for accessing id to access data from differnt routes of APIs
      allVehiclesInApi.map(async (elem) => {
        // destructuring id
        let { id } = elem;

        // fetching details of the vehicle by id and saving inside a variable
        getById = await fetchApiData({
          ...options,
          url: `${process.env.SWAGGER_CLIENT_API}/${id}`,
        });

        // fetching fuel details of the vehicle by id and saving inside a variable
        fuelById = await fetchApiData({
          ...options,
          url: `${process.env.SWAGGER_CLIENT_API}/${id}/fuel`,
        });

        // fetching odometer details of the vehicle by id and saving inside a variable
        odometerById = await fetchApiData({
          ...options,
          url: `${process.env.SWAGGER_CLIENT_API}/${id}/odometer`,
        });

        // concatening all the data to a single object
        vehicle = {};
        await Object.assign(
          vehicle,
          getById,
          { fuel: fuelById },
          odometerById,
          { deletedAt: "" }
        );

        const updVehicle = await Vehicles.findOneAndUpdate({ id }, vehicle, {
          new: true,
          upsert: true,
        });

        if (updVehicle) console.log("Updated Successfully");
        else console.log("Error while updating");
      });

      await allVehiclesInMongo
        .filter(
          ({ id: id1, deletedAt: deletedAt }) =>
            !allVehiclesInApi.some(({ id: id2 }) => id2 === id1) &&
            deletedAt == ""
        )
        .map(async ({ _id }) => {
          await Vehicles.findOneAndUpdate(
            { _id },
            { deletedAt: new Date().toISOString() }
          );
        });

      return;
    } else {
      console.log("No Vehicles are found in List of Vehicles");
      return;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}

module.exports = { mongoScheduler };
