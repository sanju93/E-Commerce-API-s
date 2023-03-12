const express = require('express');
const router = express.Router();
const userController = require('../controller/user');
const passport = require('passport');

router.get('/signin',userController.signIn);
router.get('/signup',userController.signup);
router.get('/profile',userController.profile);
router.post('/create',userController.signUpPost);
router.post('/create-session',passport.authenticate('local',{failureRedirect : '/users/signin'}),userController.signInPost);
router.get('/logout',userController.logout);

module.exports = router;