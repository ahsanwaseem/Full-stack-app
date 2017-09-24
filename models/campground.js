var mongoose = require("mongoose");

//schema setup

var campgroundSchema = new mongoose.Schema({
   name:String,
   image:String,
   description:String,
   comment : [
      
      {
         type : mongoose.Schema.Types.ObjectId,
         ref : "Comment"
      }
      
      ]
});

module.exports = mongoose.model("campground",campgroundSchema);