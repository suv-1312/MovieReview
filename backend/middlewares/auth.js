const jwt = require('jsonwebtoken');
const {sendError} = require('../utils/helper')
const User = require('../models/user');

exports.isAuth = async (req,res,next)=>{

	const token = req.headers?.authorization;
    
	if(!token) return sendError(res,'nahi mila Token');

	const jwtToken = token.split('Bearer ')[1];

	if(!jwtToken) return sendError(res,'nahi mila Token');
	const decode = jwt.verify(jwtToken,'asdsadjksdha');

	const {userId} = decode;

	const user = await User.findById(userId);
	
	if(!user) return sendError(res,'Invalid Token user not found',404);

	req.user = user;
	next();

}

exports.isAdmin = (req,res,next) => {

	const {user} = req;

	if(user.role!=='admin')
		return sendError(res,'unauthorized access!!');


	next();
}