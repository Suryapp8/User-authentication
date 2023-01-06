const Post = require("../../../models/post")
const Comment = require("../../../models/comment")
module.exports.index = async function(req, res){

    let posts = await Post.find({})
        .sort("-createdAt")
        .populate('user')
        .populate({
            path: "comments",
            populate:{
                path:"user"
            }
        })
    return res.json(200, {
        message: "List of posts" , 
        posts: posts
    })
}

module.exports.destroy = function(req, res){
    Post.findById(req.params.id, function(err, post){
        if(post.user == req.user.id){
            post.remove();

          

            Comment.deleteMany({post: req.params.id}, function(err){
                return res.redirect("back")
            })
            return res.json(200,{
                message: "Comment deleted successfully"
            })

        }else{
            return res.redirect("back")
        }
    })
}