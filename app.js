const firebase = require('firebase/compat/app');
require('firebase/compat/auth');
const firebaseConfig = require('./firebase.config');
firebase.initializeApp(firebaseConfig);


const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');


//Import routers
const game = require('./src/routers/videogames/game');
const user = require('./src/routers/users/user');
const auth = require('./src/routers/auth');

// Configure midldlewares
app.use(cors({
    origin: "*",
    methods: "GET,HEAD,POST,PATCH,PUT,DELETE"
}));

// Serve images
app.use('/uploads/videogames', express.static('uploads/videogames'));
app.use('/uploads/users', express.static('uploads/users'));

app.use(express.json());

// Handle router upload images to change ext
app.get('/uploads/:category/:filename.:ext', (req, res) => {
    const category = req.params.category;
    const filename = req.params.filename;
    const ext = req.params.ext;
  
    // Check in if the extention is not '.wepb' and redirect to the version '.webp'
    if (ext !== 'webp') {
      res.redirect(`/uploads/${category}/${filename}.webp`);
    } else {
      // If the extention is .webp simply serve the file.
      res.sendFile(path.join(__dirname, `./uploads/${category}/${filename}.${ext}`));
    }
  });

// Global router for accessing especific routers
app.use('/users', user);
app.use('/games', game);
app.use('/auth', auth);

// Exports the module (app)
module.exports = app;