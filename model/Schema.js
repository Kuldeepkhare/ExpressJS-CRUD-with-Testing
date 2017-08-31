let mongoose =require('mongoose');
//let mongoose=require('mongoose');
let Schema=mongoose.Schema;
let DetailSchema=new Schema({
	name: String,
	age:Number,
});

module.exports = mongoose.model('Details',DetailSchema);