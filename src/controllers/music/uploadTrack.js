const { ObjectId,GridFSBucket } = require('mongodb')
const { getConnection } = require('../../../db')
const multer = require('multer')
const { Readable } = require('stream')
const Song = require('../../models/music/song');


const getTrack = (req, res) => {
    // console.log(req.params.trackID,req.params.songID);
    let trackID;
    try{
        trackID = new ObjectId(req.params.trackID);
    }catch(Error){  
        return res.status(400).json({ message: "Invalid track in URL parameter.", Error});
    }

    res.type('audio/mp3');
    res.attachment('track.mp3');
    // res.set("content-type", "audio/mp3");
    // res.set("content-type", "bytes");


    const db = getConnection();
    let bucket = new GridFSBucket(db,{
        bucketName: 'tracks'
    })
    let downloadStream = bucket.openDownloadStream(trackID);

    downloadStream.on('data', chunk => {
        // console.log('dowload track');

        res.write(chunk);
    })
    
    downloadStream.on('error', () => {
        res.sendStatus(404);
    })
    
    downloadStream.on('end', () => {
        // console.log('end dowloaded track');

        res.end();
    })
}

const storage = multer.memoryStorage();
const upload = multer({storage, 
    limits: {
        fields: 3,
        fileSize: 9000000,
        files: 1, 
        parts: 5,
    }
}).single('track');

//Upload track
const uploadTrack = (req, res) => {
    console.log(req.body)
   upload(req,res, async (error) => {
    if(error){
        return res.status(400).json({message: error.message});
    }else if(!req.body.songID){
        return res.status(400).json({nessage: 'Notrack songID in request body'});
    }
      
    const songID = req.body.songID;
    const song = await Song.findById(songID);

    if (!song) {
        return res.status(404).json({ message: 'Song not found' });
    }

    let trackName = req.body.songID;

    const readableTrackStream = new Readable();
    readableTrackStream.push(req.file.buffer);
    readableTrackStream.push(null);

    const db = getConnection();
    let bucket = new GridFSBucket(db, {
      bucketName: 'tracks'
    });

    let uploadStream = bucket.openUploadStream(trackName);
    let id = uploadStream.id;
    readableTrackStream.pipe(uploadStream);

    uploadStream.on('error', () => {
        return res.status(500).json({ message: "Error uploading file" });
      });
  
      uploadStream.on('finish', async () => {
        song.trackID = id;
        await song.save();

        return res.status(201).json({ message: "File uploaded successfully, stored under Mongo ObjectID: " + id });
      });
   })
}

module.exports = {
    getTrack,
    uploadTrack,
}