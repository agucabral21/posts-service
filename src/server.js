// Environment variables configuration
const dotenv = require('dotenv');
dotenv.config();

const { db, app } = require('./config');

db.connect()
  .then(() => {
    // Server start
    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`API listening on port ${port}!`));
  })
  .catch((err) => {
    console.log('ERROR connecting to db: ', err);
  });
