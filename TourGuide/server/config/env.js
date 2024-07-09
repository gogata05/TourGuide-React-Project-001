exports.PORT = process.env.PORT || 3000;
const dbName = "TourGuide5";
// exports.DB_CONNECTION_URL = `mongodb://127.0.0.1:27017/${dbName}`;

exports.DB_CONNECTION_URL =
  "mongodb+srv://gogata1905:BjeY01xWU2axq3ZR@cluster0-tourguide2.atkegg8.mongodb.net/";
exports.SECRET = process.env.SECRET || "djas-jio2323-9887dasn23f321-dsdas";
exports.SALT_ROUNDS = process.env.SALT_ROUNDS || 10;
