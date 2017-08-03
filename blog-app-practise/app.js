var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/restful-blog-app");

app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

var blogSchema = new mongoose.Schema({
    
    title: String,
    image: String,
    body:String,
    created:{type:Date,default:Date.now}
});

var blog = mongoose.model("blog",blogSchema);

// blog.create({
//   title:"Hello",
//   image:"https://www.photosforclass.com/download/34057990733",
//   body:"This is a blog post"
// });

app.get("/",function(req,res){
    res.redirect("/blogs");
});

// Index Route
app.get('/blogs',function(req,res){
    blog.find({},function(err,blogs){
        if(err){
            console.log(err);
        }else{
             res.render("index",{blogs:blogs}); 
        }
    })
});

app.listen(process.env.PORT,process.env.IP,function(){
   console.log("server is running"); 
});
