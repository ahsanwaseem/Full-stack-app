var express = require("express");
var router = express.Router();
var campground = require("../models/campground");
var middleware = require("../middleware");
var geocoder = require('geocoder');

router.get("/",function(req,res){

    campground.find({},function(err,allcampgrounds ){
        console.log(req.user);
       if(err){
           console.log(err);
      } 
    else{
            res.render("campgrounds/index",{campgrounds:allcampgrounds,currentUser:req.user}); 
      }
    });
});

router.post("/",middleware.isLoggedIn,function(req,res){
    var name  = req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    var desc  = req.body.description;
    var author = {
        id:req.user._id,
        username: req.user.username
    }
      geocoder.geocode(req.body.location, function (err, data) {
    var lat = data.results[0].geometry.location.lat;
    var lng = data.results[0].geometry.location.lng;
    var location = data.results[0].formatted_address;
    var newCampground = {name: name, image: image, description: desc, price: price, author:author, location: location, lat: lat, lng: lng};
    // Create a new campground and save to DB
    campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to campgrounds page
            console.log(newlyCreated);
            res.redirect("/campgrounds");
        }
    });
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

// router.put("/:id", function(req, res){
//     geocoder.geocode(req.body.location, function (err, data) {
//     var lat = data.results[0].geometry.location.lat;
//     var lng = data.results[0].geometry.location.lng;
//     var location = data.results[0].formatted_address;
//     var newData = {name: req.body.name, image: req.body.image, description: req.body.description, price: req.body.price, location: location, lat: lat, lng: lng};
//     campground.findByIdAndUpdate(req.params.id, {$set: newData}, function(err, campground){
//         if(err){
//             req.flash("error", err.message);
//             res.redirect("back");
//         } else {
//             console.log(data)
//             req.flash("success","Successfully Updated!");
//             res.redirect("/campgrounds/" + campground._id);
//         }
//     });
//   });
// });
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