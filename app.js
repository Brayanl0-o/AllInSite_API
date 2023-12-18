const express = require('express');
const cors = require('cors');
const app = express();

const game = require('./routers/videogames/game')
const user = require('./routers/users/user')
const auth = require('./routers/auth')
const upload = require('./routers/upload')
const uploadImgGame = require('./routers/videogames/uploadGame')
const uploadImgUser = require('./routers/users/uploadUser')

//Config midldlewares
app.use(cors({
    origin: "*",
    methods: "GET,HEAD,POST,PATCH,PUT,DELETE"
}));
app.use('/uploads/videogames', express.static('uploads/videogames'));
app.use('/uploads/users', express.static('uploads/users'));

app.use(express.json());

app.get('/uploads/:category/:filename.:ext', (req, res) => {
    const category = req.params.category;
    const filename = req.params.filename;
    const ext = req.params.ext;
  
    // Verificar si la extensión no es .webp y redirigir a la versión .webp
    if (ext !== 'webp') {
      res.redirect(`/uploads/${category}/${filename}.webp`);
    } else {
      // Si la extensión ya es .webp, simplemente servir el archivo
      res.sendFile(path.join(__dirname, `./uploads/${category}/${filename}.${ext}`));
    }
  });

//router global
app.use('/upload', upload )
app.use('/uploadImgGame', uploadImgGame )
app.use('/users', user)
app.use('/games', game)
app.use('/auth', auth)
app.use('/uploadImgUser', uploadImgUser )

module.exports = app;