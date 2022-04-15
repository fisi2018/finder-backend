const { getPlacesDao, updatePlaceDao, createPlaceDao } = require("../../dao/place");
const { handleError } = require("../../helpers/handleError")

const showPlacesService=async()=>{
    try{
        const result=await getPlacesDao();
        if(result.error) return handleError(result.error,"No se puede obtener los lugares",result.status);
        return result;
    }catch(err){
        return handleError(err,"Ha ocurrido un error en la capa de servicios",500);
    }
}
const updatePlaceService=async(fields,id)=>{
    try{
        const result=await updatePlaceDao(fields,id);
        if(result.error)return handleError(result.error,result.message,result.status);
        return {
            message:"Lugar actualizado exitosamente",
            status:202
        }
    }catch(err){
       return handleError(err,"Ha ocurrido un error en la capa de servicios",500);
    }
}
const createPlaceService=async(fields)=>{
    try{
        const result=await createPlaceDao(fields);
        if(result.error) return handleError(result.error,result.message);
        return{
            message:"Lugar nuevo creado exitosamente",
            status:201
        }
    }catch(err){
        return handleError(err,"Ha ocurrido un error en la capa de servicios");
    }
}
module.exports={showPlacesService,updatePlaceService,createPlaceService}