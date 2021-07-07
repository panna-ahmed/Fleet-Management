const request = require("request");
function fetchApiData(options) {
  try {
    return new Promise((resolve, reject) => {
      request(options, function (err, res, body) {
        if (res && res.statusCode != 200) {
          resolve(null);
        } else if (err) {
          reject(err);
        } else {
          let json = JSON.parse(body);
          if (json != undefined && json != "") resolve(json);
          else reject();
        }
      });
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

module.exports = { fetchApiData };
