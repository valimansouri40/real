const Order= require('../Models/OrderModels');

const catchAsync= require('../Utils/catchAsync');

exports.setUserIdInOrder=catchAsync(async(req, res , next)=>{
   
        req.body.user = req.user.id;
        
        
        next()
})

exports.postOrder=catchAsync(async (req ,res)=>{
    
    
        const orders= await Order.create(req.body);
      
        res.status(201).json({
            status:'success',
            data:orders
        })
})

exports.getOrders=catchAsync(async(req, res)=>{
       
    const orders= await Order.find({user:req.user.id});
    
   
    res.status(201).json({
        status:'success',
        data:orders
    })
})
