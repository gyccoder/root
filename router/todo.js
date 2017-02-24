var express=require('express');
var router=express.Router();
var noLogin=require('../middleware/checkLogin').noLogin;
var todoModel=require('../models/todoModel');

//for url ../todo/
router.get('/',noLogin,function(req,res,next){
	todoModel.getList(req.session.user.name).then(function(todos){
		res.render('todos',{list:todos});
	}).catch(function(err){
		console.log(err);
	});
	
});


module.exports=router;
