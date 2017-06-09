// Load the required packages
var mongoose = require('mongoose');
Schema = mongoose.Schema

// Define the structure of item schema
var itemSchema = new Schema({
  name        : {type : String},
  password     : {type : String},
  category    : {type : String}
});

var tempuser =new Schema({
  name        : {type : String},
  password     : {type : String},
  category    : {type : String},
  key         : {type : String},

});

//define subscribed user
var subuser=new Schema({
  subscribeBy : {type : Array},
  seriesid     :{type : String}
})

// Define the structure of series schema
var seriesSchema = new Schema({
  seriesId      : {type : Number, required : true, unique : true},
  seriesName    : {type : String, required : true, unique : true},
  description   : String,
  createdBy     : String,
  createdDate   : {type: Date, default: Date.now()},
  updatedDate   : Date
});

// Define the structure of seasons schema
  var seasonsSchema = new Schema({
  seriesId      : {type : Number},
  seasonId      : {type : Number, required : true, unique : true},
  name          : String,
  Description   : String,
  StartsOn      : String,
  endsOn        : String,
  createdDate   : {type: Date, default: Date.now()},
  updatedDate   : Date,
  image         :String
});

// Define the structure of comics schema
var comicsSchema = new Schema({
  seriesId      : {type : Number, required : true},
  seasonId      : {type : Number, required : true},
  comicId       : {type : Number, required : true, unique : true},
  comicName     : {type : String, required : true},
  image         : {type: String, data: Buffer},
  story         : String,
  createdDate   : {type: Date, default: Date.now()},
  updatedDate   : Date

});
//exporting the model
var Users = mongoose.model('Users',itemSchema);
var Series = mongoose.model('Series',seriesSchema);
var Seasons = mongoose.model('Seasons',seasonsSchema);
var Comics = mongoose.model('Comics',comicsSchema);
var temp=mongoose.model('temp',tempuser);
var sub=mongoose.model('sub',subuser)
module.exports = {
  Users        : Users,
  Series       : Series,
  Seasons      : Seasons,
  Comics       : Comics,
  temp         : temp,
  sub          : sub
}
