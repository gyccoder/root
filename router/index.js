var welcome=require('./welcome');
var login=require('./login');
var regist=require('./regist');
var save=require('./save');
var remove=require('./remove');
var getList=require('./getList');
var edit=require('./edit');
var todo=require('./todo');

module.exports=function(app){
	app.use('/',welcome);
	app.use('/login', login);
	app.use('/register', regist);
	app.use('/save',save);
	app.use('/remove',remove);
	app.use('/list',getList);
	app.use('/edit',edit);
	app.use('/todos',todo);
};