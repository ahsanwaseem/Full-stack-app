var express = require("express");
var router = express.Router({mergeParams : true});
var campground = require("../models/campground");
var comment = require("../models/comment");

//comment routes

router.get("/new",isLoggedIn,function (req,res){
    //find campground by id
    campground.findById(req.params.id, function(err,campground){
        if (err){
            console.log(err);
        }else{
            
            res.render("comments/new",{campground:campground});
        }
    });
});

router.post("/",isLoggedIn,function(req,res){
    campground.findById(req.params.id,function(err,campground){
        if(err){
            console.log(err)
            res.redirect("/campgrounds");
        }else{
            console.log(req.body.comment);
            comment.create(req.body.comment,function(err,comment){
              if(err){
                  console.log(err)
              }else{
                  //add username and id to comment
                  comment.author.id = req.user._id;
                  comment.author.username = req.user.username;
                  console.log(req.user.username);
                  // save comment
                  comment.save();
                  campground.comment.push(comment);
                  campground.save();
                  res.redirect("/campgrounds/" + campground._id);
              }  
            });
        }
    });
    // lookup campground using ID
    // create new comment
    // connect new comment to campground
    // redirect campground show page
});

router.get("/:comment_id/edit",function(req,res){
    comment.findById(req.params.comment_id,function(err,foundComment){
       if(err){
           res.redirect("back");
       }else{
           res.render("comments/edit",{campground_id:req.params.id,comment:foundComment});
       }
    });
});

router.put("/:comment_id",function(req,res){
    comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,updatedComment){
        if(err){
          res.redirect("back");  
        }else{
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
}); 

function isLoggedIn(req,res,next){
   if(req.isAuthenticated()) {
       return next();
   }
   res.redirect("/login");
}


module.exports = router;