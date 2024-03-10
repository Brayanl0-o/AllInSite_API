const admin = require('firebase-admin');
// const serviceAccount = require('../config/serviceAccountKey.json')

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });

const authMiddleware = async (req, res, next) => {
  try {
    // Verifica si se ha incluido un token en el encabezado de autorización
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const token = authHeader.split(' ')[1];

    // Verifica y decodifica el token utilizando la clave pública de Firebase
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error('Error en el middleware de autenticación:', error);
    return res.status(401).json({ error: 'Unauthorized' });
  }
};

module.exports = authMiddleware;


