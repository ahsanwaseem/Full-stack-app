var mongoose = require("mongoose");
var campground = require("./models/campground");
var Comment = require("./models/comment");
var data = [
    
    {
    name : "Cloud's Rest" , 
    image:"https://farm7.staticflickr.com/6089/6094103869_d53a990c83.jpg",
    description: "amazing campground"
        
    },
     
    {
    name : "Desert Mesa" , 
    image:"https://farm2.staticflickr.com/1363/1342367857_2fd12531e7.jpg",
    description: "wonderful campground"
        
    },
     
    {
    name : "Canyon Floor" , 
    image:"https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg",
    description: "fantastic campground"
        
    }
    
    ]

function seedDB(){
    
    //Remove all campgrounds
    
    campground.remove({},function(err){
    
    if(err){
        console.log(err);
    }
   
   console.log("removed campgrounds"); 
   // add a few campgrounds
       data.forEach(function(seed){
        campground.create(seed,function(err,campground){
            if(err){
                console.log(err);
            }else{
                console.log("added a campground");
                // create a comment
                Comment.create({
                    text:"This place is great",
                    author:"Homer"
                }, function(err,comment){
                    if(err){
                        console.log(err)
                    }else{
                    campground.comment.push(comment);
                    campground.save();
                    console.log("created new comment");
                    }
                });
            }
        });
});
});

// add a few comments
}

module.exports = seedDB;

