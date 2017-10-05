var middlewareObj = {};
var campground = require("../models/campground");
var comment = require("../models/comment");

middlewareObj.checkCommentAuthorisation = function(req,res,next){
      if(req.isAuthenticated()){
        // does the user own the comment
          comment.findById(req.params.comment_id,function(err,foundComment){
       if(err){
           res.redirect("back");
           console.log(err);
       } else{
           console.log(foundComment.author.id);
           console.log(req.user._id);
          if(foundComment.author.id.equals(req.user._id)){
              next();
          }else{
              req.flash("error","You dont have permission to do that");
              res.redirect("back");
          }
       }
          });
      }else{
          req.flash("error","You need to be logged in to do that");
          res.redirect("back");
      }
}

middlewareObj.checkUserAuthorisation = function(req,res,next){
      if(req.isAuthenticated()){
        // does the user own the campground
          campground.findById(req.params.id,function(err,foundCampground){
       if(err){
           req.flash("error","Campground not found");
           res.redirect("back");
           console.log(err);
       } else{
           console.log(foundCampground.author.id);
           console.log(req.user._id);
          if(foundCampground.author.id.equals(req.user._id)){
              next();
          }else{
              req.flash("error","You dont have permission to do that");
              res.redirect("back");
          }
       }
          });
      }else{
          req.flash("error","You need to be logged in to do that");
          res.redirect("back");
      }
}

middlewareObj.isLoggedIn = function(req,res,next){
   if(req.isAuthenticated()) {
       return next();
   }
   req.flash("error","Please Login First");
   res.redirect("/login");
};

module.exports = middlewareObj;