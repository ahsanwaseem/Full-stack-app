var express = require("express");
var router = express.Router();
var campground = require("../models/campground");

router.get("/",function(req,res){

    campground.find({},function(err,allcampgrounds ){
        console.log(req.user);
       if(err){
           console.log(err);
       } else{
            res.render("campgrounds/index",{campgrounds:allcampgrounds,currentUser:req.user}); 
       }
    });
   
});

router.post("/",isLoggedIn,function(req,res){
    var name  = req.body.name;
    var image = req.body.image;
    var desc  = req.body.description;
    var author = {
        id:req.user._id,
        username: req.user.username
    }
    var newCampground = {name:name,image:image,description:desc,author:author}
    console.log(req.user);
    
    campground.create(newCampground,function(err,newlycreated){
        if(err){
            console.log(err);
        }else{
            res.redirect("/campgrounds"); 
        }
    });
   
});

//NEW - show form to create a new campground
router.get("/new",isLoggedIn,function(req,res){
    res.render("campgrounds/new");
});

router.get("/:id",function(req,res){
    campground.findById(req.params.id).populate("comment").exec(function(err,foundCampground){
     if(err){
         console.log(err)
     } else{
         console.log(foundCampground);
         res.render("campgrounds/show",{campground:foundCampground}); 
     }  
    });
});

//edit campground route
router.get("/:id/edit",checkUserAuthorisation,function(req,res){
        campground.findById(req.params.id,function(err,foundCampground){
        res.render("campgrounds/edit",{campground:foundCampground});
});
});
// update campground route
router.put("/:id",checkUserAuthorisation,function(req,res){
    campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updatedcampground){
        if(err){
            res.redirect("/campgrounds");
        }else{
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

// destroy campground route

router.delete("/:id",checkUserAuthorisation,function(req,res){
   campground.findByIdAndRemove(req.params.id,function(err){
      if(err){
          res.redirect("/campgrounds");
      } else{
           res.redirect("/campgrounds");
      }
   }); 
});

function checkUserAuthorisation(req,res,next){
      if(req.isAuthenticated()){
        // does the user own the campground
          campground.findById(req.params.id,function(err,foundCampground){
       if(err){
           res.redirect("back");
           console.log(err);
       } else{
           console.log(foundCampground.author.id);
           console.log(req.user._id);
          if(foundCampground.author.id.equals(req.user._id)){
              next();
          }else{
              res.redirect("back");
          }
       }
          });
      }else{
          res.redirect("back");
      }
}

function isLoggedIn(req,res,next){
   if(req.isAuthenticated()) {
       return next();
   }
   res.redirect("/login");
}


module.exports = router;