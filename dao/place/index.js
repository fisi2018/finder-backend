const { handleError } = require("../../helpers/handleError")
const PlaceModel=require("../../apiServices/place/model");
const getPlacesDao=async()=>{
    try{
        const result=await PlaceModel.find();
        if(!result)return handleError(true,"No es posible obtener todos los lugares",400);
        return result;
    }catch(err){
        return handleError(err,"Ha ocurrido un error en la capa de datos",500);
    }
}
const createPlaceDao=async(fields)=>{
    try{
        await PlaceModel.create(fields);
        return{
            message:"Lugar agregado exitosamente",
            status:201
        }
    }catch(err){
        return handleError(err,"Ha ocurrido un error en la capa de datos",500);
    }
}
const updatePlaceDao=async(fields,id)=>{
    try{
        const result=await PlaceModel.findByIdAndUpdate(id,fields);
        if(!result) return handleError(true,"No existe el lugar",400);
        return{
            message:"Lugar actualizado exitosamente",
            status:202
        }
    }catch(err){
        return handleError(err,"Ha ocurrido un error en la capa de datos",500);
    }
}
module.exports={getPlacesDao,createPlaceDao,updatePlaceDao}