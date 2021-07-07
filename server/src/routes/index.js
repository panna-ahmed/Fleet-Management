const { authenticate, authorization } = require("../middlewares/auth");

const indexRouter = require("express").Router();

indexRouter.get("/", authenticate, authorization(0), (req, res, next) => {
    return res.json({ Homepage: "Home page of Sahel Vehicles" })
})

module.exports = indexRouter