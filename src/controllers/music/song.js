const Song = require('../../models/music/song');
const User = require('../../models/user');
const Playlist = require('../../models/music/playList.js');

const controllerSong = {
    create: async(req,res) =>{
        
        try{
            console.log('llegada',req.body)

            const { songName, singer, songImg, releaseDate, genre, averageRating, duration, lyrics, linkToYoutube, linkToDeezer, linkToSpotify } = req.body;
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
                lyrics,
                linkToYoutube, 
                linkToDeezer,
                linkToSpotify
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
    createPlaylist: async (req, res) => {
        try {
            const { name } = req.body;
            const userId = req.body.userId; 
            console.log('',userId )

            const newPlaylist = new Playlist({
                name,
                createdBy: userId
            });

            await newPlaylist.save();

            const user = await User.findById(userId);
            user.playlists.push(newPlaylist._id);
            await user.save();

            res.json(newPlaylist);
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    getPlaylists: async (req, res) => {

        Playlist.find({}).then(playlists => {
            console.log(playlists);
        }).catch(error => {
            console.error('Error:', error);
        });
        try {
            const playlists = await Playlist.find({});
            console.log(playlists);
            res.json(playlists);
        } catch (error) {
            console.error('Error al obtener las listas de reproducción:', error);
            return res.status(500).json({ msg: error.message, details: error });
        }
    },
    addSongToPlaylist: async (req, res) => {
        try {
            const { playlistId, songId } = req.params;
            const playlist = await Playlist.findById(playlistId);

            if (!playlist) {
                return res.status(404).json({ message: 'Playlist not found' });
            }
            if (!playlist.songs.includes(songId)) {
                playlist.songs.push(songId);
            }

            await playlist.save();
            res.json(playlist);
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    delteSongFromPlaylist: async (req, res) => {
        try {
            const { playlistId, songId } = req.params;

            const updatedPlaylist  = await Playlist.findByIdAndUpdate(
                playlistId,
                { $pull: {songs: songId }},
                { new: true }
            );
        
            if (!updatedPlaylist) {
                return res.status(404).json({ msg: 'Playlist not found' });
            }
    
            res.json({ msg: 'Song removed from playlist', playlist: updatedPlaylist });
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    deletePlaylist:async (req,res)=> {
        try {
            const { id } = req.params;
            const playlist = await Playlist.findById(id);

            if (!playlist) {
                return res.status(404).json({ msg: 'Playlist not found' });
            }
            
            await Playlist.findByIdAndDelete(id);
            await User.updateMany(
                { playlists: id },
                { $pull: { playlists: id } }
            );
            
            res.json({ msg: 'Delete playlist' });
        } catch (error) {
            console.error('Error al eliminar la playlist:', error);
            return res.status(500).json({ msg: error.message });
        }
    },   
    // Function for updating a Song
    updateSong:async(req, res)=>{
        try{
            // Retrieve the Id from 'req.params'
            const {id } = req.params;
            // Retrieve the Song data from 'req.body'
            const updatedSongData = req.body;
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