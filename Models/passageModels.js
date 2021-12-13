const mongooose= require('mongoose');

const passageSchema= mongooose.Schema({
    name:{
        
        type: String,
    },
   data:{
    type:Object,
    required:[true,'enter data']
   },
    passageDate:{
        type:Date,
        default: Date.now()
    }
})

const Passage= mongooose.model('Passage', passageSchema);

module.exports=Passage;