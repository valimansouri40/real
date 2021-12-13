const Passage= require('../Models/passageModels');
const fs= require('fs')
const catchAsync = require('../Utils/catchAsync');


exports.PostPassage=catchAsync(async(req,res)=>{
    
   
    
        const passage= await Passage.create(req.body);
        res.status(200).json({
            status:'success',
            data:passage
        })
        
})

exports.GetPassage=catchAsync(async(req,res)=>{
    
        const passage= await Passage.find().select('-data');

        res.status(200).json({
            status:'success',
            data:passage
        })
})

exports.DeletePassage=catchAsync(async(req,res)=>{
    const param= req.params.id;
    
    const passage= await Passage.findByIdAndDelete(param);
  
        res.status(200).json({
            status:'success',
            data:passage
        })
})

exports.getOnePoassage=catchAsync(async(req,res)=>{

    const id= req.params.id;
    const passage= await Passage.findById(id);

    res.status(200).json({
        status:'succes',
        data:passage
    })
})