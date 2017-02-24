var express=require('express');
var sha1=require('sha1');
var userModel=require('../models/userModel');
var hasLogin=require('../middleware/checkLogin').hasLogin;
var router=express.Router();

router.get('/',function(req,res,next){
	res.render("login",{channel:'register'});
});
router.post('/',hasLogin,function(req,res,next){
	var name=req.body.name;
	var pwd=req.body.password;
	userModel.save({name:name,password:sha1(pwd)}).then(function(user){
		delete user.password;
		req.session.user=user;
		res.redirect('todos');
	}).catch(function(err){
		console.log(err);
	});
});

module.exports=router;