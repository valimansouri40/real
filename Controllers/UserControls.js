const User= require('../Models/userModels');
const AppError = require('../Utils/appError');
const catchAsync = require('../Utils/catchAsync');


exports.updatepassword=catchAsync(async(req,res,next)=>{
        const users= await User.findOne(req.user.id).select('+password');

        if(!user){
            next(new AppError('user not true',401));
        }

        if(!await User.compairepassword(users.password, req.body.currentpassword)){
            next( new AppError('password not correct',401));
        }

        User.password = currentpassword,
        User.passwordConfirm = currentpassword

        await User.save();

});

exports.updateMe= catchAsync(async(req,res,next)=>{
        const {email, name ,photo} = req.body;

        const users= await User.findOne(req.user.id);

        if(!users) next( new AppError('not user',404))

        this.email= email;
        this.name = name;
        this.photo= photo;
        await User.save();
})

exports.getUser=catchAsync(async(req,res)=>{
        const user= await User.findById(req.user._id);
        
        res.status(200).json({
            status:'success',
            data: user
        })
})
exports.usersdeleteUser=catchAsync(async(req,res)=>{
    const user= await User.findByIdAndDelete(req.user._id);
    
    res.status(200).json({
        status:'success',
        data: user
    })
})