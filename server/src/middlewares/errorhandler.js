const errorHandler = (err, req, res, next) => {

    if (typeof (err) === 'string') {
        console.log(err)
        // custom application error
        return res.status(400).json({ message: err.message });
    }

    if (err.name === 'ValidationError') {
        console.log(err)
        return res.status(400).json({ message: err.message });
    }

    if (err.name === 'UnauthorizedError') {
        console.log(err)
        // jwt authentication error
        return res.status(401).json({ message: "Invalid Token" });
    }

    console.log(err)
    // default to 500 server error
    return res.status(500).json({ message: err.message });
}

module.exports = { errorHandler };