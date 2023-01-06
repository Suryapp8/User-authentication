const User = require("../models/user")
const fs = require("fs")
const path = require("path")
const Post = require('../models/post');

module.exports.profile = function(req, res){
    User.findById(req.params.id, function(err, user){
        return res.render('userProfile', {
            title: 'User Profile',
            profileUser : user
        })
    })
    
}

module.exports.update = async function(req,res){
    // if(req.user.id == req.params.id){
    //     User.findByIdAndUpdate(req.params.id, req.body, function(err, user){
    //         return res.redirect("back")
    //     })
    // }else{
    //     return res.status(401).send("Unauthorized")
    // }

    if(req.user.id == req.params.id){
        try{
            let user = await User.findById(req.params.id)
            User.uploadedAvatar(req, res, function(err){
                if(err){
                    console.log("Error", err)
                }
                user.name = req.body.name;
                user.email = req.body.email;

                if(req.file){
                    if(user.avatar){
                        fs.unlinkSync(path.join(__dirname, ".." , user.avatar))
                    }
                    user.avatar = User.avatarPath + "/"  + req.file.filename
                    // req.flash("success", "Profile picture updated")
                }
                user.save();
                return res.redirect("back")
            })
        }catch(err){
            req.flash("error", err)
        return res.redirect("back")
        }
    }else{
        req.flash("error", "Unauthorized")
        return res.status(401).send("Unauthorized")
    }
}

module.exports.signUp = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect("/user/profile")
    }

    return res.render("userSignOut" ,{
        title: "Codieal | Sign up"
    })
}

// module.exports.profile = function(req, res){
//     if(req.cookies.user_id){
//         User.findById(req.cookies.user_id, function (err, user) {
//             if(user){
//                 return res.render("userProfile",{
//                     title: "User Profile",
//                     user: user
//                 })
//             }
//             return res.redirect("/user/signIn")
//         })
//     }
//     else{
//         return res.redirect("/user/signIn")
//     }
    
// }

// module.exports.signUp = function(req, res){
//     return res.render("userSignOut", {
//         title: "Sign up page"
//     })
// }

module.exports.signIn = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect("/user/profile")
    }
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

    //using passport now

    req.flash("success" , "Logged in Successfully")

    return res.redirect("/")

    
}
module.exports.destroySession = function (req, res){
    
    req.logout(function(err) {
        if (err) { return next(err); }
        
        req.flash("success" , "You have logged out")
        
      });
      
      res.redirect('/');
      
}



// module.exports.create = function(req, res){
//     Post.create({
//         content: req.body.content,
//         user: req.user._id
//     }, function(err, post){
//         if(err){console.log('error in creating a post'); return;}

//         return res.redirect('/user/profile')
//     });
// }