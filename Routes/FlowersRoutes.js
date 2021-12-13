const express= require('express');

const flower= require('../Controllers/FlowersControls');
const auth= require('../Controllers/authControls');

const router= express.Router();


//router.use(auth.logedin);
router.route('/').get(flower.getallflowers)
.post(flower.uploadUserPhoto,flower.resizeUserPhoto,flower.creatflower);
router.route('/:id').get(flower.getoneflower).patch(flower.uploadUserPhoto,flower.updateoneflower).delete(flower.deleteoneflower);

module.exports = router;