const User= require('../Models/userModels');
const jwt= require('jsonwebtoken');
const {promisify}= require('util')
const catchAsync= require('../Utils/catchAsync');
const appError= require('../Utils/appError');


const createToken=id=>{
    return jwt.sign({id}, process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRES_IN
    })
}

const createSendToken =async (user, statusCode, res) => {
  const token = createToken(user._id);
  const cookieOption= {
    expires:new Date(
        Date.now() * 1 + 1000 * 60 * 60 * 24 * 90
    ),
    httpOnly: false
}


await res.cookie('jwt', token, cookieOption);



res.status(statusCode).json({
    status:'succes',
    data: user,
    token: token
})
};

exports.Sineup=catchAsync(async(req,res)=>{
    const newUser = await User.create(req.body);
      
     
    createSendToken(newUser,200, res)
   
})

exports.login=catchAsync(async (req,res,next)=>{
  
      const {password, email}= req.body;
      if(!email || !password){
        next(new appError('put email and password'))
      }
      const users= await User.findOne({email}).select('+password');
        
      if (!users || !(await users.compairepassword(password , users.password))) {
        return next(new appError('Incorrect email or password', 401));
      }
      
      
      createSendToken(users,200, res)

     
})

exports.protect=catchAsync(async(req,res,next)=>{
 
    let token;
  // if (
  //   req.headers.authorization &&
  //   req.headers.authorization.startsWith('Bearer')
  // ) {
  //   token = req.headers.authorization.split(' ')[1];
  // }else 
  if(req.cookies.jwt){
    token = req.cookies.jwt
  }
    if(!token){
        next( new appError('not token',404));
    }
     
     const corect=await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    
     if(!corect){
         next( new appError('توکن صحیح نیست',404))
    }
    const current= await User.findById(corect.id);
    if(!current){
        next( new appError('not id',404))
    }
      
         req.user=current
    
    next();
})

exports.logedin=catchAsync(async(req,res,next)=>{
        if(req.cookies.jwt){
          
          const id= await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRET) 

          

          const current= await User.findById(id.id);
          if(!current){
            next()
          }
        
          res.locals.user= current;
        }
        next()
})

exports.logOut=catchAsync(async(req,res,next)=>{
      if(req.cookies.jwt){
        res.cookie('jwt','logedin',{
          expires:new Date(Date.now() + 4 * 100 ),
          httpOnly:true
        })
      }
      next(new appError('can not logout',404))
})

exports.existCookie=catchAsync(async (req,res)=>{
        let jwt= false;
          if(req.cookies.jwt){
            jwt= true;
          }
          console.log(jwt)
          res.status(200).json({
            status:'succes',
            cookie: jwt
          })
})
