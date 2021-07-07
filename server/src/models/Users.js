const mongoose = require('mongoose'),
  mongodbErrorHandler = require('mongoose-mongodb-errors'),
  Schema = mongoose.Schema,
  
  userSchema = new Schema({
    username: String,
    password: String,
    // 0 for admin 
    role: Number
  }, {
    timestamps: true
  });

// for error handling for mongo
userSchema.plugin(mongodbErrorHandler);


module.exports.User = mongoose.model('User', userSchema);


