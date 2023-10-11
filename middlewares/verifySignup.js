

const verifySignup ={

    //Validación de roles
    checkRoleExist: (req, res, next) => {

        if (!req.body.admin || req.body.admin.length === 0) {
            req.body.admin = ["user"]
        }
        
        for (let i = 0; i < req.body.admin.length; i++) {
            if (!['usuario', 'administrador'].includes(req.body.admin[i])){
                return res.status(400).json({
                    message: `Role ${req.body.admin[i]} does not exist`});
            }
        }
        
        next();
    }

    
}


module.exports = verifySignup