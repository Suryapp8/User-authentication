const express = require("express")
const userController = require("../controllers/userController")
const router = express.Router();
const passport = require("passport")

console.log('user router loaded');

router.get("/profile", passport.checkAuthentication, userController.profile)
router.get("/signUp", userController.signUp)
router.get("/signIn", userController.signIn)
router.post("/create" , userController.create)
// router.post("/createSession" , userController.createSession)

// using passport as middleware
router.post("/createSession", passport.authenticate(
    "local" , {failureRedirect: "/user/signIn"}
) , userController.createSession)

router.get("/signOut" , userController.destroySession)

module.exports = router;