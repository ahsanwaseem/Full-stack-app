var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var campground = require("./models/campground");
var comment = require("./models/comment");
var seedDB = require("./seeds");

seedDB();
mongoose.connect("mongodb://localhost/yelp-camp");

app.use(bodyParser.urlencoded({extended:true}));

app.set("view engine","ejs");

app.get("/",function(req,res){
    res.render("landing");
});

app.get("/campgrounds",function(req,res){

    campground.find({},function(err,allcampgrounds ){
       if(err){
           console.log(err);
       } else{
            res.render("campgrounds/index",{campgrounds:allcampgrounds}); 
       }
    });
   
});

app.post("/campgrounds",function(req,res){
    var name  = req.body.name;
    var image = req.body.image;
    var desc  = req.body.description;
    var newCampground = {name:name,image:image,description:desc}
    campground.create(newCampground,function(err,newlycreated){
        if(err){
            console.log(err);
        }else{
            res.redirect("/campgrounds"); 
        }
    });
   
});

//NEW - show form to create a new campground
app.get("/campgrounds/new",function(req,res){
    res.render("campgrounds/new");
});

app.get("/campgrounds/:id",function(req,res){
    campground.findById(req.params.id).populate("comment").exec(function(err,foundCampground){
     if(err){
         console.log(err)
     } else{
         console.log(foundCampground);
         res.render("campgrounds/show",{campground:foundCampground}); 
     }  
    });
});

//comment routes

app.get("/campgrounds/:id/comments/new",function(req,res){
    //find campground by id
    campground.findById(req.params.id, function(err,campground){
        if (err){
            console.log(err);
        }else{
            
            res.render("comments/new",{campground:campground});
        }
    });
});

app.post("/campgrounds/:id/comments",function(req,res){
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

app.listen(process.env.PORT,process.env.IP,function(){
 console.log("server is ready");   
});