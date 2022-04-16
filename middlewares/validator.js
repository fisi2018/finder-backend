const { body, validationResult } = require("express-validator");

const validateRegister=async(req,res,next)=>{
    await Promise.all([body("email").isEmail().run(req),
    body("name").exists({checkFalsy:true,checkNull:true}).matches(/^[a-z A-ZáéíóúñÑ,.'´-]+$/).isLength({max:32}).run(req)]);
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).send({
            error:errors.array(),
            message:"Datos inválidos"
        })
    };
    next();
}
module.exports={validateRegister}