const apiFeacher= require('../Utils/apiFeacher');

exports.getallflowers=Flower=>async(req,res)=>{

        const flowers= new apiFeacher(Flower.find(), req.query).search().sort().fields().page();
        const doc= await flowers.flower;
        res.status(200).json({
            status:'succes',
            length: flowers.length,
            data:{
                flower: doc
            }
        })
}
exports.createFlowers=Flower=>async(req ,res) =>{
    const create= await Flower.create(req.body);
    res.status(200).json({
        status:'succes',
        data:{
            flower: create
        }
    })
}

exports.getOne= async(req,res)=>{
    const param= req.params.id;
    const create= await Flower.findById(param);
    res.status(200).json({
        status:'succes',
        data:{
            flower: create
        }
    })
}

exports.updateOne= async(req,res)=>{
    const param= req.params.id;
    const create= await Flower.findByIdAndUpdate(param, req.body);
    res.status(200).json({
        status:'succes',
        data:{
            flower: create
        }
    })
}
exports.deleteOne= async(req,res)=>{
    const param= req.params.id;
    const create= await Flower.findByIdAndDelete(param);
    res.status(200).json({
        status:'succes',
        data:{
            flower: create
        }
    })
}
