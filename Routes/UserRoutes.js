const express= require('express');
const auth= require('../Controllers/authControls');
const users= require('../Controllers/UserControls')

const router= express.Router();

router.route('/sineup').post(auth.Sineup);
router.route('/login').post(auth.login)
router.route('/updatepassword').post(auth.protect, users.updatepassword);
router.route('/logout').post(auth.logOut)
router.route('/').get(auth.protect,users.getUser).delete(auth.protect, users.usersdeleteUser)
router.route('/updateme').post(auth.protect, users.updateMe)
router.route('/cookie').get(auth.existCookie);
module.exports = router;
