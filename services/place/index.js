const { getPlacesDao, updatePlaceDao, createPlaceDao } = require("../../dao/place");
const { handleError } = require("../../helpers/handleError")

const showPlacesService=async()=>{
    try{
        const result=await getPlacesDao();
        if(result.error) return handleError(result.error,"No se puede obtener los lugares");
        return result;
    }catch(err){
        return handleError(err,"Ha ocurrido un error en la capa de servicios");
    }
}
const updatePlaceService=async(fields,id)=>{
    try{
        const result=await updatePlaceDao(fields,id);
        if(result.error)return handleError(result.error,result.message);
        return {
            message:"Lugar actualizado exitosamente"
        }
    }catch(err){
       return handleError(err,"Ha ocurrido un error en la capa de servicios");
    }
}
const createPlaceService=async(fields)=>{
    try{
        const result=await createPlaceDao(fields);
        if(result.error) return handleError(result.error,result.message);
        return{
            message:"Lugar nuevo creado exitosamente"
        }
    }catch(err){
        return handleError(err,"Ha ocurrido un error en la capa de servicios");
    }
}
module.exports={showPlacesService,updatePlaceService,createPlaceService}