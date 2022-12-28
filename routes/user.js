const express = require("express")
const userController = require("../controllers/userController")
const router = express.Router();



router.get("/profile", userController.profile)
router.get("/signUp", userController.signUp)
router.get("/signIn", userController.signIn)

router.post("/create" , userController.create)
router.post("/createSession" , userController.createSession)

module.exports = router;