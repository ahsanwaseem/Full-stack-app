var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var campground = require("./models/campground");
var comment = require("./models/comment");
var User = require("./models/user");
var seedDB = require("./seeds");
var passport = require("passport");
var localStrategy = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");
var commentRoutes = require("./routes/comments");
var campgroundRoutes = require("./routes/campgrounds");
var authRoutes = require("./routes/index");

// seedDB();

//passport configuration

app.use(require("express-session")({
    
    secret:"Ahsan is great",
    resave:false,
    saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
   res.locals.currentUser = req.user;
   next();
});

mongoose.connect("mongodb://localhost/yelp-camp");

app.use(bodyParser.urlencoded({extended:true}));

app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));

app.use("/",authRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);
app.use("/campgrounds",campgroundRoutes);

app.listen(process.env.PORT,process.env.IP,function(){
 console.log("server is ready");   
});