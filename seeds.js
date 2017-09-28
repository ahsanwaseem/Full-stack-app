var mongoose = require("mongoose");
var campground = require("./models/campground");
var Comment = require("./models/comment");
var data = [
    
    {
    name : "Cloud's Rest" , 
    image:"https://farm7.staticflickr.com/6089/6094103869_d53a990c83.jpg",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        
    },
     
    {
    name : "Desert Mesa" , 
    image:"https://farm2.staticflickr.com/1363/1342367857_2fd12531e7.jpg",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        
    },
     
    {
    name : "Canyon Floor" , 
    image:"https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        
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

