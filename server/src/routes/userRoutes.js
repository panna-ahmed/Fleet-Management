const userRouter = require('express').Router();

function routes() {

    const user = require('../controller/User/user').userController();

      // register user with username,name and password
      userRouter.post("/user/register", user.register);
     
      // login user with username and password
      userRouter.post("/user/login", user.login);

    return userRouter;
}
module.exports = { routes }