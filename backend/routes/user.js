const express = require('express');

const {
	create,
	signIn,
	verifyEmail,
	resendEmailVerificationToken,
	forgetPassword,
	sendResetPasswordTokenStatus,
	resetPassword

} = require('../controllers/user'); 

const {userValidator,signInValidator,validate,validatePassword} = require('../middlewares/validator');
const {isValidPassResetToken} = require('../middlewares/user');
const {isAuth} = require('../middlewares/auth');

const router = express.Router();

router.post('/create',userValidator,validate,create);
router.post('/signin',signInValidator,validate,signIn);
router.post('/verify-email',verifyEmail);
router.post('/resend-email-verification-token',resendEmailVerificationToken);
router.post('/forget-password',forgetPassword);
router.post('/verify-pass-reset-token',isValidPassResetToken,sendResetPasswordTokenStatus);
router.post('/reset-password',validatePassword,validate,isValidPassResetToken,resetPassword);

router.get('/is-auth',isAuth,(req,res) => {

	const {user} = req;
	res.json({user:{id:user._id,name:user.name,email:user.email,isVerified:user.isVerified,role:user.role}});
});

module.exports = router;