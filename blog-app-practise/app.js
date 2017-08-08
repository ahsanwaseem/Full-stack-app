var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var methodOverride = require("method-override");
mongoose.connect("mongodb://localhost/restful-blog-app");

app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));

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

//New Route
app.get("/blogs/new",function(req,res){
    res.render("new");
});

//Create Route
app.post("/blogs",function(req,res){
    blog.create(req.body.blog,function(err,newblog){
        if(err){
            res.render("new");
        }else{
            res.redirect("/blogs");
        }
    });
});

//Show Route
app.get("/blogs/:id",function(req,res){
    blog.findById(req.params.id,function(err,foundblog){
        if(err){
            res.redirect("/blogs");
        }else{
            res.render("show",{blog:foundblog});
        }
    });
});

//Edit Route
app.get("/blogs/:id/edit",function(req,res){
    blog.findById(req.params.id,function(err,foundblog){
        if(err){
            res.redirect("/blogs");
        }else{
            res.render("edit",{blog:foundblog});
        }
    });
})

//Update Route
app.put("/blogs/:id",function(req,res){
    blog.findByIdAndUpdate(req.params.id,req.body.blog,function(err,updatedblog){
        if(err){
            res.redirect("/blogs");
        }else{
            res.redirect("/blogs/" + req.params.id);
        }
    });
});

//Delete Route
app.delete("/blogs/:id",function(req,res){
    blog.findByIdAndRemove(req.params.id,function(err){
        if(err){
            res.redirect("/blogs");
        }else{
            res.redirect("/blogs");
        }
    })
});

app.listen(process.env.PORT,process.env.IP,function(){
   console.log("server is running"); 
});
