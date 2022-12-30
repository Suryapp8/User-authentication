const Post = require('../models/post')


console.log('post Controller');

module.exports.create = function(req, res){
    Post.create({
        content: req.body.content,
        user: req.user._id,
    }, function(err, post){
        if(err){console.log('error in creating a post'); return;}

        return res.redirect('/')
    });
}