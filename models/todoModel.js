var Todo=require('../lib/mongo').Todo;
module.exports={
	save:function(todo){
		var todo=new Todo(todo);
		todo.save();
		return todo;
	},
	getList:function(author){
		return Todo.find({author:author}).select('content done').exec();
	},
	edit:function(id,data){
		return Todo.update({_id:id},{$set:data}).exec();
	},
	remove:function(id){
		return Todo.remove({_id:id}).exec();
	}
}