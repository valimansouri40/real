const express= require('express');

const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const cors=require("cors")
const globalerror= require('./Controllers/errorControls');
const FlowerRoute= require('./Routes/FlowersRoutes');
const UserRoute= require('./Routes/UserRoutes');
const OrderRoute= require('./Routes/OrderRoutes');
const PassageRote= require('./Routes/PassageRotes');
const cookieParser= require('cookie-parser');

const AppError=require('./Utils/appError');

const app= express();
app.use(express.json());


app.use(helmet());
const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP, please try again in an hour!'
  });
  app.use('/api', limiter);
app.use(cookieParser());
app.use(mongoSanitize());
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
// Data sanitization against XSS
app.use(xss());
const corsOptions = {
    origin: true, //included origin as true
    credentials: true, //included credentials as true
};

app.use(cors(corsOptions));

app.use(cookieParser())

app.use((req,res,next)=>{
    req.requestTime = new Date().toISOString();
    
    next();
})


app.use('/api/v1/flowers',FlowerRoute);
app.use('/api/v1/users',UserRoute);
app.use('/api/v1/orders', OrderRoute);
app.use('/api/v1/passage', PassageRote);

app.all('*',(req,res,next)=>{
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404))
})

app.use(globalerror);

module.exports= app;