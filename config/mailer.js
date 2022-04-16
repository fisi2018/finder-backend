const nodemailer=require("nodemailer");
require("dotenv").config();
let transporter=nodemailer.createTransport({
    host:"smtp.titan.email",
    port:465,
    secure:true,
    auth:{
        user:process.env.EMAIL,
        pass:process.env.PASSWORD
    }
});

transporter.verify().then(()=>{
    console.log("Mailer listo para enviar correos");
}).catch((err)=>{
    console.log("Error al iniciar mailer ",err)
})

module.exports=transporter