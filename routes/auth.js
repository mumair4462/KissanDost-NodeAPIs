const express = require("express");;
const router = express.Router();
const {login, signup, updateProfile,getusers} = require('../controllers/auth')

router.route('/login').get(login)
router.route('/signup').post(signup);
router.route('/users').get(getusers);

router.route('/updateProfile').post(updateProfile);

module.exports = router;