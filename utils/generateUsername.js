const generateUsername=(email)=>{
    const firstPart=email.split("@").shift();
    const num=Math.trunc(Math.random()*10000);
    const username="@"+firstPart+num;
    if(username.length>32){
        return username.padEnd(32);
    }
    return username;
}
module.exports=generateUsername