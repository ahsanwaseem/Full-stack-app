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
   image:String
});

var campground = mongoose.model("campground",campgroundSchema);

// campground.create({
    
//     name: "Granite Hill",
//     image:"http://www.photosforclass.com/download/6094103869"
    
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
            res.render("campgrounds",{campgrounds:allcampgrounds}); 
       }
    });
   
});

app.post("/campgrounds",function(req,res){
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name:name,image:image}
    campground.create(newCampground,function(err,newlycreated){
        if(err){
            console.log(err);
        }else{
            res.redirect("/campgrounds"); 
        }
    });
   
});

app.get("/campgrounds/new",function(req,res){
    res.render("new.ejs");
});

app.listen(process.env.PORT,process.env.IP,function(){
 console.log("server is ready");   
});