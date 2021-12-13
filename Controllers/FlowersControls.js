
const Flower= require('../Models/FlowerModels');
const catchAsync = require('../Utils/catchAsync');
const factory= require('./ControlFactory');
const apiFeacher= require('../Utils/apiFeacher')
const  multer= require('multer');
const AppError = require('../Utils/appError');
const sharp = require('sharp');
const fs= require('fs');

// const multerStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'public/flowerimg');
//   },
//   filename: (req, file, cb) => {
//     const ext = file.mimetype.split('/')[1];
//     cb(null, `user--${Date.now()}.jpeg`);
//   }
// });

const multerStorage = multer.memoryStorage()

const multerFilter = (req, file, cb) => {
  
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});

exports.uploadUserPhoto = upload.single('photo');

exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
 
  if (!req.file) return next();
    
  

 const ph= await sharp(req.file.buffer)
    .resize(800, 800)
    .toFormat('jpeg')
    .jpeg({ quality: 20 })
    .toBuffer();
     req.body.photo = ph;
  next()
});



exports.creatflower=async(req ,res) =>{

        
  
    
  // const url = req.protocol + '://' + req.get('host')
   const create= await Flower.create(req.body);
  //const create= await Flower.deleteMany()
  console.log(create)
    res.status(200).json({
        status:'success',
        data:{
            flower: create
        }
    })
};
exports.getoneflower= async(req,res)=>{
    const param= req.params.id;
    const create= await Flower.findById(param);
    res.status(200).json({
        status:'succes',
        data:{
            flower: create
        }
    })
}
exports.updateoneflower=async(req,res)=>{
  console.log(req.file)
    const param= req.params.id;
    const create= await Flower.findByIdAndUpdate(param, req.file);
    console.log(create,'yuy');
    res.status(200).json({
        status:'succes',
        data:{
            flower: create
        }
    })
}
exports.deleteoneflower=async(req,res)=>{
    const param= req.params.id;
    const create= await Flower.findByIdAndDelete(param);
    res.status(200).json({
        status:'succes',
        data:{
            flower: create
        }
    })
}


exports.getallflowers=catchAsync(async(req,res)=>{
     // const search = req.params.search;
     
     const reg= new RegExp(`${req.query.fields}`,'i')
        const length=(await Flower.find()).length
        
     const flowers= new apiFeacher(Flower.find({$or:[{"imageCover":reg},{"name":reg}]}), req.query)
     .filter().sort().paginate();
     const doc= await flowers.query;
    res.status(200).json({
        status:'succes',
        length: length,
        data:doc
    })
   
})
