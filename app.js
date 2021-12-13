const express= require('express');
const path = require('path');
const globalerror= require('./Controllers/errorControls');
const FlowerRoute= require('./Routes/FlowersRoutes');
const UserRoute= require('./Routes/UserRoutes');
const OrderRoute= require('./Routes/OrderRoutes');
const PassageRote= require('./Routes/PassageRotes');
const cookieParser= require('cookie-parser');
const cors= require('cors');
const AppError=require('./Utils/appError');

const app= express();
app.use(express.json());
app.use(cors());
app.use(cookieParser())

app.use((req,res,next)=>{
    req.requestTime = new Date().toISOString();
    
    next();
})
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1/flowers',FlowerRoute);
app.use('/api/v1/users',UserRoute);
app.use('/api/v1/orders', OrderRoute);
app.use('/api/v1/passage', PassageRote);

app.all('*',(req,res,next)=>{
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404))
})

app.use(globalerror);

module.exports= app;