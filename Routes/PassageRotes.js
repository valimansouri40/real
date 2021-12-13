const express= require('express');
const Passage= require('../Controllers/PassageControls');
const flower= require('../Controllers/FlowersControls');
const router= express.Router();

router.route('/').post(Passage.PostPassage).get(Passage.GetPassage);
router.route('/:id').delete(Passage.DeletePassage).get(Passage.getOnePoassage);
module.exports= router;