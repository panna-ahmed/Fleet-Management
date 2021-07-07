const { Vehicles } = require("../../models/Vehicles");

function odometer() {

    const getById = async (req, res, next) => {
        try {
            let { id } = req.params,
                vehicle = await Vehicles.findOne({ _id: id }, (`odometer distancesincereset distancesincestart`)) ?? null;
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
        getById
    }
}

module.exports = { odometer }