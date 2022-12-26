const express = require("express")
const homeController = require("../controllers/controller")
const router = express.Router();

console.log("I am router")

router.get("/", homeController.home)

module.exports = router;