var mongoose=require('mongoose');
var config=require('../config/base');
var connect=mongoose.createConnection(config.mongo);
var userSchema=new mongoose.Schema({
	name:String,
	password:String
});
var todoSchema=new mongoose.Schema({
	author:String,
	content:String,
	done:Boolean,
});
var User=connect.model('users',userSchema);
var Todo=connect.model('todos',todoSchema);
module.exports={
	User:User,
	Todo:Todo
};