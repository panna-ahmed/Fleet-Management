const { User } = require("../../models/Users.js"),
  { generateAccessToken } = require('../../utils/jwtToken'),
  bcrypt = require('bcryptjs');

function userController() {

  // register new user API fucntion
  const register = async (req, res, next) => {
    try {
      let { username, password } = await req.body,
        userValidate = await User.findOne({ username });
      // validate
      if (userValidate) {
        return res.status(400).json({ message: "User Already Exists" })
      }
      let user = new User(req.body);
      // hash password
      if (password) {
        user.password = bcrypt.hashSync(password, 10);
      }
      // save user in MOngo DB
      await user.save();
      // deleting password attribute to send other data in response to user
      delete user.password
      return res.status(201).json({
        message: "User Registered Successfully",
        data: user
      })
    } catch (error) {
      console.log(error)
      return next(error)
    }

  }


  // login controller
  const login = async (req, res, next) => {
    try {
      // destructuring username and password from body
      const { username, password } = await req.body,
        user = await User.findOne({ username });
      // comparing password with the db and checking if user is found in DB
      if (user && bcrypt.compareSync(password, user.password)) {
        const accessToken = generateAccessToken(user); // genrrating access token
        // delete password key from user
        user.password = undefined;
        // sending response 
        return res.status(200).json({
          message: "Successfully Logged In",
          accessToken,
          expires: 7200000,
          user
        })
      }
      //  password or username is not found
      else
        return res.status(400).json({ message: 'Username or password is incorrect' })
    } catch (error) {
      console.log(error.message);
      return next(error);
    }

  }

  return {
    register,
    login,
  }

}

module.exports = { userController }
