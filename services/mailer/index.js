const transporter= require("../../config/mailer");
const { handleError } = require("../../helpers/handleError")

const sendEmail=async(code,email)=>{
    try{
        let info=await transporter.sendMail({
            from:'"Finder" <soporte@prysmosolutions.com>',
            to:email,
            subject:`Envío de código de verificación `,
            html:`<div>
                <h1>${code}</h1>
                <p>Este código expirará en 3 minutos.</p>
                <p>Si usted no solicitó este servicio ignore este mensaje.</p>
            </div>`
        });
        return{
            message:"Mensaje enviado exitosamente"
        }
    }catch(err){
        console.log("error catch ",err, "tipo ", typeof err);
        return handleError(err,"Ha ocurrido un error al enviar el mensaje",500);
    }
}
module.exports={sendEmail}