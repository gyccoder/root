var express=require('express');
var todoModel=require('../models/todoModel');
var router=express.Router();

//for url ../list/
router.get('/',function(req,res,next){
	var author=req.session.user.name;
	todoModel.getList(author).then(function(list){
		res.send(list);
	}).catch(function(err){
		console.log(err);
	});
});
router.post('/',function(req,res){
	var author=req.session.user.name;
	todoModel.getList(author).then(function(list){
		res.send(list);
	}).catch(function(err){
		console.log(err);
	});
});

module.exports=router;
