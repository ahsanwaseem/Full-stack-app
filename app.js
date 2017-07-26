var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));

app.set("view engine","ejs");

    var campgrounds = 
    [ {name: "Salmon Creek", image:"http://www.photosforclass.com/download/1342367857" },
      {name: "Granite Hill", image:"http://www.photosforclass.com/download/6094103869"},
      {name: "Mountain Goats Rest", image:"http://www.photosforclass.com/download/1342367857"},
      {name: "Salmon Creek", image:"http://www.photosforclass.com/download/1342367857" },
      {name: "Granite Hill", image:"http://www.photosforclass.com/download/6094103869"},
      {name: "Mountain Goats Rest", image:"http://www.photosforclass.com/download/1342367857"}
    ];
    

app.get("/",function(req,res){
    res.render("landing");
});

app.get("/campgrounds",function(req,res){

    res.render("campgrounds",{campgrounds:campgrounds});
});

app.post("/campgrounds",function(req,res){
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name:name,image:image}
    campgrounds.push(newCampground);
    res.redirect("/campgrounds");
});

app.get("/campgrounds/new",function(req,res){
    res.render("new.ejs");
});

app.listen(process.env.PORT,process.env.IP,function(){
 console.log("server is ready");   
});