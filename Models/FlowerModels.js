const mongoose= require('mongoose');
const validator= require('validator');

const flowerSchema= new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'لطفا نام راوارد کنید'],
        unique:true,
        trim:true,
        max:[40, 'تعداد کاراکتر ها بیش از حد زیاد است'],
        min:[3, 'تعداد کاراکتر ها خیلی کم است']
    },
    price:{
        type:Number,
        required:[true, 'قیمت را وارد کنید'],

    },
      ratingsAverage: {
        type: Number,
        default: 4.5,
        min: [1, 'Rating must be above 1.0'],
        max: [5, 'Rating must be below 5.0'],
        set: val => Math.round(val * 10) / 10 // 4.666666, 46.6666, 47, 4.7
      },
      ratingsQuantity: {
        type: Number,
        default: 0
      },
      price: {
        type: Number,
        // required: [true, 'قیمت را وارد کنید']
      },
      priceDiscount: {
        type: Number,
        validate: {
          validator: function(val) {
            // this only points to current doc on NEW document creation
            return val < this.price;
          },
          message: 'Discount price ({VALUE}) should be below regular price'
        }
      },
      description: {
        type: String,
        trim: true
      },
      some:{
        type: Number,
        default: 0
      },
      imageCover: {
        type: String,
        required: [true, 'A tour must have a cover image']
      },
      photo: {
        type:Object,
        default:"default.jpg"
      },
      createdAt: {
        type: Date,
        default: Date.now(),
        select: false
      },
},{
  toJSON: {virtuals:true},
  toObject: {virtuals: true}
})

const Flower = mongoose.model('Flowers', flowerSchema);

module.exports= Flower;