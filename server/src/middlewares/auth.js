const jwt = require("jsonwebtoken");

// function to authenticate jwt token and see if user is logged in or not
const authenticate = async (req, res, next) => {
    try {
        // checking for token inside http cookie
        const token = await req.header("authorization")?.split(" ")[1];
        // check if token is available or not
        if (!token) {
            return res.status(401).json({ message: "No token, Authentication Denied!!!" })
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        req.user = decoded.user;
        return next();
    } catch (error) {
        console.log(error.message)
        return res.status(401).json({ message: `Token invalid or ${error.message}` });
    }
}

// function to check if logged in user is authorized to access the selected route
const authorization = (requiredRole) => {
    return (req, res, next) => {
        if (!req.header('userRole'))
            return res.status(400).json({ message: "User Role is not defined" })
        if (Number(req.header('userRole')) === requiredRole)
            return next();
        else
            return res.status(401).json({ message: "Current user is not allowed to access this path..." });
    }
}


module.exports = { authenticate, authorization }