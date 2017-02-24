var express=require('express');
var todoModel=require('../models/todoModel');
var router=express.Router();

router.get('/',function(req,res,next){
	res.render('save');
});
router.post('/',function(req,res){
	var savedItem=todoModel.save({author:req.session.user.name,content:req.body.content,done:req.body.done});
	res.send(savedItem);
});

module.exports=router;