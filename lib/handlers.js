const data = require("./data");

const handlers = {};

handlers.users = (data, callback) => {
  const acceptableMethods = ["post", "get", "delete", "put"];
  if (acceptableMethods.indexOf(data.method) > -1) {
    handlers._users[data.method](data, callback);
  } else {
    callback(405);
  }
};

handlers._users = {};

handlers._users.post = (data, callback) => {
  callback(200, { foo: "bar" });
};

handlers._users.get = (data, callback) => {};

handlers._users.delete = (data, callback) => {};

handlers._users.put = (data, callback) => {};

handlers.ping = (data, callback) => {
  callback(200);
};

handlers.notFound = (data, callback) => {
  callback(404);
};

module.exports = handlers;
