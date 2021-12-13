const dotenv= require('dotenv');
const app = require('./app');
  const mongoose= require('mongoose');
  
  dotenv.config({path: './congfig.env'})
  //const db= process.env.DATABASE.replace('<PASSWORD>',process.env.PASSWORD)
  mongoose.connect(process.env.LOCAL_DATABASE,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:false,
    useUnifiedTopology:true
  }).then(()=>console.log('connect to mongoose')
  ).catch((err)=>{console.log(err)})
  
  
  



  const port= process.env.port || 8000;
  app.listen(port, () => {
    console.log(`App running on port ${port}...`);
  });