const User = require("../models/user")

module.exports.profile = function(req, res){
    if(req.cookies.user_id){
        User.findById(req.cookies.user_id, function (err, user) {
            if(user){
                return res.render("userProfile",{
                    title: "User Profile",
                    user: user
                })
            }
            return res.redirect("/user/signIn")
        })
    }
    else{
        return res.redirect("/user/signIn")
    }
    
}

module.exports.signUp = function(req, res){
    return res.render("userSignOut", {
        title: "Sign up page"
    })
}

module.exports.signIn = function(req, res){
    return res.render("userSignIn", {
        title: "Sign in page"
    })
}

//get the sign up date

module.exports.create = function(req, res){
    if(req.body.password != req.body.confirmPassword){
        return res.redirect("back")
    }
    User.findOne({email: req.body.email}, function(err, user){
        if(err){
            console.log("error in finding user in signing up");
            return
        }
        if(!user){
            User.create(req.body, function(err, user){
                if(err){
                    console.log("error in creating user in signing up");
                    return
                }
            })
            return res.redirect("/user/signIn")
        }
        else{
            return res.redirect("back")
        }

    })
}

module.exports.createSession = function(req, res){
    User.findOne({email: req.body.email}, function(err, user){
        if(err){
            console.log("error in finding user in signing in");
            return
        }
        if(user){
            if(user.password != req.body.password){
                return res.redirect("back")
            }
            res.cookie("user_id" , user.id);
            return res.redirect("/user/profile")
        }
        else{
            return res.redirect("back")
        }
    })

    
}