module.exports={
	noLogin:function noLogin(req,res,next){
		if (!req.session.user) {
			req.flash('error', '请先登录!'); 
			return res.redirect('/login');
		}
		next();
	},
	hasLogin:function hasLogin(req,res,next){
		if (req.session.user) {
			req.flash('error', '登录成功!'); 
			return res.redirect('back');
		}
		next();
	}
}