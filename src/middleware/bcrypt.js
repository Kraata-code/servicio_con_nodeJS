const bcrypt = require("bcrypt");

async function hashPassword(req,res,next){
    try{
        const { password } = req.body;
        if(password){
            req.body.password = await bcrypt.hash(password, 10);
        }
        next();
    }catch(error){
        next(error); 
    }
}

module.exports = hashPassword;