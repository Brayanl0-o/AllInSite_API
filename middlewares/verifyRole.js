const validateRoles = (req, res, next) => {
    const allowedRoles = ['administrador'];
  
    const tokenRoles = req.userRoles;
    console.log('roles middleware',req.userRoles)
   
    if (!tokenRoles || !Array.isArray(tokenRoles)) {
      return res.status(400).json({ message: 'Los roles del token son requeridos' });
    }
  
    // Iterar sobre los roles del token
    for (const role of tokenRoles) {
      if (!allowedRoles.includes(role)) {
        return res.status(400).json({ message: `Role ${role} no es válido.` });
      }
    }
  
    next();
  };
  
  module.exports = validateRoles;