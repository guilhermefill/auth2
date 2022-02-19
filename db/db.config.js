const mongoose = require('mongoose')

// Connection to the database "recipe-app"
const mongoConnection = () => {
    mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
}

module.exports = mongoConnection;
