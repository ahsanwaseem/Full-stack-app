var express = require("express");
var router = express.Router();
var campground = require("../models/campground");
var middleware = require("../middleware");

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

router.post("/",middleware.isLoggedIn,function(req,res){
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
router.get("/new",middleware.isLoggedIn,function(req,res){
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
router.get("/:id/edit",middleware.checkUserAuthorisation,function(req,res){
        campground.findById(req.params.id,function(err,foundCampground){
        res.render("campgrounds/edit",{campground:foundCampground});
});
});
// update campground route
router.put("/:id",middleware.checkUserAuthorisation,function(req,res){
    campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updatedcampground){
        if(err){
            res.redirect("/campgrounds");
        }else{
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

// destroy campground route

router.delete("/:id",middleware.checkUserAuthorisation,function(req,res){
   campground.findByIdAndRemove(req.params.id,function(err){
      if(err){
          res.redirect("/campgrounds");
      } else{
           res.redirect("/campgrounds");
      }
   }); 
});


module.exports = router;