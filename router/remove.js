var express=require('express');
var todoModel=require('../models/todoModel');
var router=express.Router();

//for url ../remove/
router.post('/',function(req,res){
	var _id=req.body.id;
	console.log('removeid: '+_id);
	todoModel.remove(_id).then(function(){
		res.send('remove done');
	}).catch(function(err){
		console.log(err);
	});
});

module.exports=router;
