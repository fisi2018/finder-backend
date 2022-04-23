const bcrypt=require("bcryptjs");

const encrypt=async(text)=>{
    const hash=await bcrypt.hash(text,10);
    return hash;
}
const compare=async(text,hash)=>{
    const result=await bcrypt.compare(text,hash);
    return result;
}
module.exports={encrypt,compare}