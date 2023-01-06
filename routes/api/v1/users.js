const express = require('express');

const router = express.Router();
const userAPI = require("../../../controllers/api/v1/usersAPI")
router.post("/createSession" , userAPI.createSession)
module.exports = router