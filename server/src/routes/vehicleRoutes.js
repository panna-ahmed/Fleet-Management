const { authenticate } = require('../middlewares/auth');

const vehiclesRouter = require('express').Router();

function routes() {

    const vehicle = require('../controller/Vehicles/vehicle').vehiclesController(),
        fuel = require('../controller/Vehicles/fuel').fuel(),
        odometer = require('../controller/Vehicles/odometer').odometer();

    // get all vehicles route
    vehiclesRouter.get("/vehicles", authenticate, vehicle.getAllVehicles);

    // get  vehicle by id route
    vehiclesRouter.get("/vehicles/:id", authenticate, vehicle.getVehicleById);

    // get vehicle fuel by id route
    vehiclesRouter.get("/vehicles/:id/fuel", authenticate, fuel.getById);

    // get vehicle odometer by id route
    vehiclesRouter.get("/vehicles/:id/odometer", authenticate, odometer.getById);

    //  add more routes here

    return vehiclesRouter;
}
module.exports = { routes }