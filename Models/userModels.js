const mongoose = require('mongoose');
const validator= require('validator');
const bcrypt= require('bcryptjs')

const userSchema= new mongoose.Schema({
        name:{
            type: String,
            required:[true, 'نام وارد شده صحیح نیست'],
            min:[3, 'تعداد کاراکتر ها کم است'],
            max:[30, 'تعداد کاراکتر هازیاد است']
        },
        email:{
            type: String,
            required: [true, 'Please provide your email'],
            unique: true,
            lowercase: true,
            validate: [validator.isEmail, 'Please provide a valid email']
        },
        password:{
            type:String,
            required:[true, 'لطفا رمز خود را وارد کنید'],
            select:true
        },
        role:{
            type:String,
            enum:['admin','user'],
            default: 'admin'
        },
        passwordConfirm:{
            type:String,
            required:[true, 'رمز خود را تایید نکردید'],
            select:false,
            validate:{
                validator: function(el) {
                    return el === this.password;
                  },
                  message: 'رمز ها متفاوت هستند!'
            }
        },
        photo:String,
        changepasswordAT:Date
})
userSchema.pre('save',async function(next){
        if(!this.isModified('password')) return next();
        this.password= await bcrypt.hash(this.password, 12);
        console.log(';kklj')
        this.passwordConfirm= undefined;
        next();

})


userSchema.methods.compairepassword = async function(
    candidatePassword,
    userPassword
  ) {
    return await bcrypt.compare(candidatePassword, userPassword);
  };
  

userSchema.methods.changepassword= function(JWTexp){
    if(this.changepasswordAT){
            const chg= JSON.parse(
                this.changepasswordAT.getTime()/1000,
                10)
        return JWTexp < chg;
    }
}
const User= mongoose.model('Karbar', userSchema);
module.exports= User;