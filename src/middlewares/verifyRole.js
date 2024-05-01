const validateRoles = (req, res, next) => {
    // Define the allowed roles for accessing the route
    const allowedRoles = ['administrador'];

    // Extract roles from the user's token stored in req.userRoles
    const tokenRoles = req.userRoles;

    // Check if roles are present and are an array
    if (!tokenRoles || !Array.isArray(tokenRoles)) {
      return res.status(400).json({ message: 'Los roles del token son requeridos' });
    }
  
    // Iterate over the roles from the token
    for (const role of tokenRoles) {
      // Check if the role is in the allowedRoles array
      if (!allowedRoles.includes(role)) {
        return res.status(400).json({ message: `Role ${role} no es válido.` });
      }
    }
  
    return next();
  };
  
  module.exports = validateRoles;