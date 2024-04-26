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
const songs = require('./src/routers/music/song');


// Configure midldlewares
app.use(cors({
    origin: "*",
    methods: "GET,HEAD,POST,PATCH,PUT,DELETE"
}));

// Serve images
app.use('/uploads/users/medium', express.static('uploads/users/medium'));
app.use('/uploads/users/small', express.static('uploads/users/small'));

app.use('/uploads/videogames/medium', express.static('uploads/videogames/medium'));
app.use('/uploads/videogames/small', express.static('uploads/videogames/small'));

app.use('/uploads/songs/medium', express.static('uploads/songs/medium'));
app.use('/uploads/songs/small', express.static('uploads/songs/small'));

app.use(express.json());

// Handle router upload images to change ext
app.get('/uploads/:category/:size/:filename.:ext', (req, res) => {
    const category = req.params.category;
    const size = req.params.size;
    const filename = req.params.filename;
    const ext = req.params.ext;
  
    // Check in if the extention is not '.wepb' and redirect to the version '.webp'
    if (ext !== 'webp') {
      res.redirect(`/uploads/${category}/${size}/${filename}.webp`);
    } else {
      // If the extention is .webp simply serve the file.
      res.sendFile(path.join(__dirname, `./uploads/${category}/${size}/${filename}.${ext}`));
    }
  });

// Global router for accessing especific routers
app.use('/users', user);
app.use('/games', game);
app.use('/songs', songs);
app.use('/auth', auth);

// Exports the module (app)
module.exports = app;