var User=require('../lib/mongo').User;
module.exports={
	save:function(user){
		var user=new User(user);
		return user.save();
	},
	findByName:function(name){
		return User.findOne({name:name}).select('name password').exec();
	}
}