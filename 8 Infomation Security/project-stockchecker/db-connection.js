const mongoose = require("mongoose");
const db = mongoose.connect(process.env.DB);

module.exports = db;