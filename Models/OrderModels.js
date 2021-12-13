const mongooose= require('mongoose');

const orderSchema= mongooose.Schema({
    fristName:{
        required:[true, 'input fristName'],
        type:String,
        max: [20, 'max'],
        min: [3, 'min']
    },
    lastName:{
        required:[true, 'input fristName'],
        type:String,
        max: [20, 'max'],
        min: [3, 'min']
    },
    address:{
        type: String,
        required:[true,'enter the address'],
        
        max:[true, 'The number of characters is large'],
        min: [true, 'The number of characters is small']
    },
    phoneNumber:{
        type:Number,
        required: [true, 'remember enter your phoneNumber!']
    },
    order:{
        required:[true, 'notregisterd order'],
        type:Object
    },
    user:{
        type: mongooose.Schema.ObjectId,
        ref: 'Karbar',
        required: [true, 'not put useId']
    },
    OrderDate:{
        type:Date,
        default: Date.now()
    }
},
{
    toJson:{virtuals:true},
    toObject:{virtuals:true}
})

orderSchema.pre(/^find/, function(next){
    this.populate({
        path:'user',
        select: 'name'
    })
    next();
});

const Order= mongooose.model('Order', orderSchema);

module.exports=Order;