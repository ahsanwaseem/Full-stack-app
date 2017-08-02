var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/yelp-camp");

app.use(bodyParser.urlencoded({extended:true}));

app.set("view engine","ejs");

//schema setup

var campgroundSchema = new mongoose.Schema({
   name:String,
   image:String,
   description:String
});

var campground = mongoose.model("campground",campgroundSchema);

// campground.create({
    
//     name: "Granite Hill",
//     image:"http://www.photosforclass.com/download/6094103869",
//     description:"This is a huge granite hill, no bathrooms. No water. Beautiful granite!"
    
//     },function(err,campground){
//         if(err){
//             console.log("database not created");
//         }else{
//             console.log("database created");
//             console.log(campground);
//         }
//     });

app.get("/",function(req,res){
    res.render("landing");
});

app.get("/campgrounds",function(req,res){

    campground.find({},function(err,allcampgrounds ){
       if(err){
           console.log(err);
       } else{
            res.render("index",{campgrounds:allcampgrounds}); 
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
    res.render("new.ejs");
});

app.get("/campgrounds/:id",function(req,res){
    campground.findById(req.params.id,function(err,foundCampground){
     if(err){
         console.log(err)
     } else{
         res.render("show",{campground:foundCampground}); 
     }  
    });
});

app.listen(process.env.PORT,process.env.IP,function(){
 console.log("server is ready");   
});