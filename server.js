const dotenv= require('dotenv');
const app = require('./app');
  const mongoose= require('mongoose');
  
  //dotenv.config({path: './congfig.env'})
  //const db= process.env.DATABASE.replace('<password>',process.env.PASSWORD)
  mongoose.connect("mongodb+srv://valimansouri:aGq4GW3BukM1NiHScluster0.43obo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",{
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:false,
    useUnifiedTopology:true
  }).then(()=>console.log('connect to mongoose')
  ).catch((err)=>{console.log(err)})
  
  
  

  const port= process.env.PORT || 8000;
  app.listen(port, () => {
    console.log(`App running on port ${port}...`);
  });