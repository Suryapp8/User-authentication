const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/codeialDevelopment");

const db = mongoose.connection;

db.on("err" , console.error.bind(console, "Error in connecting to MongoDB"))

db.once("open", function(){
    console.log("Connected to mongo")
})

module.exports = db