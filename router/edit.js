var express=require('express');
var todoModel=require('../models/todoModel');
var router=express.Router();

//for url ../edit/
router.post('/',function(req,res){
	var _data={};
	var _id=req.body.id;
	if(req.body.content){
		_data.content=req.body.content;
	}
	if(req.body.done!=undefined){
		_data.done=req.body.done;
	}
	todoModel.edit(_id,_data).then(function(){
		res.send('edit success');
	}).catch(function(err){
		console.log(err);
	});
});

module.exports=router;
