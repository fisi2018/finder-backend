const { handleError } = require("../../helpers/handleError")
const PlaceModel=require("../../apiServices/place/model");
const getPlacesDao=async()=>{
    try{
        const result=await PlaceModel.find();
        if(!result)return handleError(true,"No es posible obtener todos los lugares");
        return result;
    }catch(err){
        return handleError(err,"Ha ocurrido un error en la capa de datos");
    }
}
const createPlaceDao=async(fields)=>{
    try{
        await PlaceModel.create(fields);
        return{
            message:"Lugar agregado exitosamente"
        }
    }catch(err){
        return handleError(err,"Ha ocurrido un error en la capa de datos");
    }
}
const updatePlaceDao=async(fields,id)=>{
    try{
        const result=await PlaceModel.findByIdAndUpdate(id,fields);
        if(!result) return handleError(true,"No existe el lugar");
        return{
            message:"Lugar actualizado exitosamente"
        }
    }catch(err){
        return handleError(err,"Ha ocurrido un error en la capa de datos");
    }
}
module.exports={getPlacesDao,createPlaceDao,updatePlaceDao}