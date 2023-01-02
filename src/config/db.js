const mongoose = require('mongoose');

const connect = () =>
  new Promise((resolve, reject) => {

    console.log("Connecting to db...")

    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT ? `:${process.env.DB_PORT}` : '';
    const name = process.env.DB_NAME || 'test';
    const user = process.env.DB_USER ? process.env.DB_USER : false;
    const pass = process.env.DB_PASS ? process.env.DB_PASS : false;
    const prefix = process.env.DB_PREFIX ? process.env.DB_PREFIX : 'mongodb';
    const connectionString = `${prefix}://${host}${port}/${name}`;

    const options = {};

    if (user) options.user = user;
    if (pass) options.pass = pass;

    mongoose.set('strictQuery', false);

    mongoose
      .connect(connectionString, options)
      .then(() => {
        console.log("DB connection achieved!")
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });

const disconnect = () => {
  mongoose.connection.close();
};

module.exports = {
  connect,
  disconnect,
};
