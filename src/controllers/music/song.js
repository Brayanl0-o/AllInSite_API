const Song = require('../../models/music/song');

const controllerSong = {
    create: async(req,res) =>{
        
        try{
            console.log('llegada',req.body)

            const { songName, singer, songImg, releaseDate, genre, averageRating, duration, lyrics } = req.body;
            const existingSong = await Song.findOne({ songName });
            if (existingSong) {
                return res.status(400).json({ error: "The song is already!" });
            };
            const song = new Song({
                songName,
                singer,
                songImg, 
                releaseDate, 
                genre, 
                averageRating, 
                duration, 
                lyrics
            });
            const savedSong = await song.save();

            return res.status(200).json({message:"Created song",songDetails: savedSong});
        }catch(e){
            return res.status(500).json({msg:"A server error occurred", details: e.message});
        }
    },
    // Function for retrieving all Songs
    getSongs:async(req, res)=>{
        try{
            const songs = await Song.find({});
            // Return the songs in reverse order
            res.json(songs.reverse());
        }catch(e){
            // If something goes wrong, show an error
            return res.status(500).json({msg:"A server error occurred", details: e.message});
        }
    },
    // Function for retrieving a Song by ID
    getSongById: async(req, res) =>{
        try{
            // Retrieve the Id from 'req.params'
            const {id}= req.params;

            // Retrieve the Song by Id from the database
            const song = await Song.findById(id);

            // Return the Song in JSON format
            res.json(song);
        }catch(error){
            // If something goes wrong, show an error
            return res.status(500).json({msg:error});
        }
    },
    // Function for updating a Song
    updateSong:async(req, res)=>{
        try{
            // Retrieve the Id from 'req.params'
            const {id } = req.params;

            // Retrieve the Song data from 'req.body'
            const updatedSongData = req.body;

            console.log(updatedSongData)
             // Find and update the Song in the database
             const updatedSong = await Song.findByIdAndUpdate(id, updatedSongData, {
                new: true,
            });
           
            // If the Song is not found, show an error message
            if (!updatedSong) {
                return res.status(404).json({ message: 'Song no found ' });
            }
                
            // Send the updated Song as a response
            res.status(200).json(updatedSong);
        }catch(error){
            // If something goes wrong, show an error
            console.error('Error to update SongImg  ',error);
            res.status(500).json({ message: 'Error in Song updated',msg:error });
        }
    },
     // Function for deleting an Song
     deleteSong:async(req, res)=>{
        try{
            // Retrieve the Id from 'req.params'
            const {id}= req.params;

            // Find and delete the Song in the database
            await Song.findByIdAndDelete(id);
            // Send a success message as a response
            res.json({msg:'Delete song'});
        }catch(error){
            // If something goes wrong, show an error
            return res.status(500).json({msg:error});
        }
    }
}
module.exports = controllerSong;