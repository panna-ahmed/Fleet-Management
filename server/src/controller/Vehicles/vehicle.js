const { Vehicles } = require("../../models/Vehicles");

function vehiclesController() {

    const getAllVehicles = async (req, res, next) => {
        try {
            let vehicles = await Vehicles.find({}, `_id licenseplate finorvin createdAt`) ?? null
            if (vehicles != null)
                return res.status(200).json(vehicles)
            else
                return res.status(404).json({ message: "No vehicles found" })
        } catch (error) {
            console.log(error.message)
            return next(error)
        }
    };


    const getVehicleById = async (req, res, next) => {
        try {
            let { id } = req.params;
            let vehicle = await Vehicles.findOne({ _id: id },
                (`_id licenseplate finorvin salesdesignation modelyear colorname fueltype powerhp powerkw numberofdoors numberofseats`))
                ?? null;
            if (vehicle != null)
                return res.status(200).json(vehicle)
            else
                return res.status(404).json({ message: "No vehicle found" })
        } catch (error) {
            console.log(error.message)
            return next(error)
        }
    }

    return {
        getAllVehicles,
        getVehicleById
    }

}

module.exports = { vehiclesController }