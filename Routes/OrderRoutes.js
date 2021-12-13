 const express= require('express');
 const orders= require('../Controllers/OrderControls');
const auth= require('../Controllers/authControls');

 const router= express.Router();

 router.route('/')
    .get(auth.protect ,orders.getOrders)
    .post(auth.protect, orders.setUserIdInOrder, orders.postOrder);

module.exports=router;