const mongoose = require('mongoose'),
    mongodbErrorHandler = require('mongoose-mongodb-errors'),
    Schema = mongoose.Schema,

    vehicleSchema = new Schema({
        id: String,
        licenseplate: String,
        finorvin: String,
        salesdesignation: String,
        modelyear: String,
        colorname: String,
        fueltype: String,
        powerhp: String,
        powerkw: String,
        numberofdoors: String,
        numberofseats: String,
        fuel: {
            unit: String,
            value: 0,
            retrievalstatus: String,
            timestamp: Number
        },
        odometer: {
            unit: String,
            value: 0,
            retrievalstatus: String,
            timestamp: Number
        },
        distancesincereset: {
            unit: String,
            value: 0,
            retrievalstatus: String,
            timestamp: Number

        },
        distancesincestart: {
            unit: String,
            value: 0,
            retrievalstatus: String,
            timestamp: Number
        },
        deletedAt: {
            type: String,
            default: ""
        }
    }, {
        timestamps: true
    });

// for error handling for mongo
vehicleSchema.plugin(mongodbErrorHandler);


module.exports.Vehicles = mongoose.model('Vehicles', vehicleSchema);


