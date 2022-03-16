const { httpError } = require("../../helpers/handleError");
const { showPlacesService, createPlaceService, updatePlaceService } = require("../../services/place");

exports.showPlaces=async(req,res)=>{
    try{
        const result=await showPlacesService();
        if(result.error)return res.send({error:result.error,message:result.message});
        return res.send(result);
    }catch(err){
        httpError(res,err);
    }
}
exports.createPlace=async(req,res)=>{
    try{
        const {title,description,address,location}=req.body;
        const result=await createPlaceService({title,description,address,location});
        if(result.error)return res.send({error:result.error,message:result.message});
        return res.send({
            message:result.message
        })
    }catch(err){
        httpError(res,err);
    }
}
exports.updatePlace=async(req,res)=>{
    try{
        const {id,...fields}=req.body;
        const result=await updatePlaceService(fields,id);
        if(result.error) return res.send({error:result.error,message:result.message});
        return res.send({
            message:result.message
        })
    }catch(err){
        httpError(res,err);
    }
}