var express=require('express');
var sha1=require('sha1');
var userModel=require('../models/userModel');
var hasLogin=require('../middleware/checkLogin').hasLogin;
var router=express.Router();

router.get('/',function(req,res,next){
	res.render("login",{channel:'login'});
});
router.post('/',hasLogin,function(req,res,next){
	var name=req.body.name;
	var pwd=req.body.password;
	console.log("name"+name);
	console.log("pwd"+pwd);
	userModel.findByName(name).then(function(user){
		console.log(user);
		if(!user){
			req.flash('error','用户不存在!');
			return res.redirect('back');
		}
		if(sha1(pwd)!=user.password){
			req.flash('error','帐号或密码有误!');
			return res.redirect('back');
		}
		req.flash('success','登录成功!');
		delete user.password;
		req.session.user=user;
		res.redirect('todos');
	}).catch(function(err){
		console.log(err);
	});
});

module.exports=router;