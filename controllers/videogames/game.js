const Game = require('../../models/game')
const gameRequeriments = require('../../models/gameRequirements')
const fs = require ('fs')
const path = require ('path')

const controllerGame = {
    // Function for creating new game
    create: async (req, res) => {
        try {
            // Extract data de 'req.body'
            const { gameName, releaseDate, platform, developer, genre, averageRating, descriptionGame, gameTrailer } = req.body;

            // Extract gameImg of 'req.file'
            const gameImg = req.file.filename;

            // Check if the image already exists in the database
            const existingGameImg = await Game.findOne({ gameImg: gameImg }).exec();
            if (existingGameImg) {
                // If the image already exists, return an error
                return res.status(400).json({ message: 'La imagen ya existe en la base de datos.' });
            }

            // Creating a new instance of the game
            const game = new Game({
                gameName,
                gameImg,
                releaseDate,
                developer,
                platform,
                genre,
                averageRating,
                descriptionGame,
                gameTrailer
            });

            // If everything is well, save the game
            const savedGame = await game.save();

            // If everything is well, show menssage 'Game created'
            return res.status(200).json({message:"Game created",game: savedGame });
        }
        catch (error) {
            // If something goes wrong, show an error
            console.error('Error uploading th game:', error);
            return res.status(500).json({ msg: 'Internal server error', error: error.message });
        }
    },  
    createOrUpdateRequirementes: async ( req,res) => {
        try{
            const {gameId, sizeGame, ramGame, processorGame, graphGame} = req.body;

            let existingRequirements = await gameRequeriments.findOne({ gameId });

            if (existingRequirements){
                existingRequirements.sizeGame = sizeGame;
                existingRequirements.ramGame = ramGame;
                existingRequirements.processorGame = processorGame;
                existingRequirements.graphGame = graphGame;

                existingRequirements = await existingRequirements.save()
                return res.status(200).json({ message: "Game requirements updated", game: existingRequirements });
            }else {
                const gameRequirements = new gameRequeriments ({
                    gameId: gameId, 
                    sizeGame, ramGame, processorGame, graphGame
                });

                const savedRequirements = await gameRequirements.save()
                return res.status(200).json({message:"Game savedRequirements ",game: savedRequirements  });
            }
         
        }catch(error){
            console.error('Error create the requirements:', error);
            return res.status(500).json({ msg: 'Internal server error', error: error.message });
        }
        
    },
     // Function for retrieving all games requirements
     getGameRequirementsById: async (req, res) => {
        try {
            // Retrieve requeriments by Id game from the database
            const gameRequirements = await gameRequeriments.find({gameId: req.params.id});

            // Return the games in reverse order
            return res.json(gameRequirements);
        } catch (error) {
            // If something goes wrong, show an error
            return res.status(500).json({ msg: error });
        }
    },
    // Function for retrieving all games
    getGame: async (req, res) => {
        try {
            // Retrieve all games from the database
            const games = await Game.find({});

            // Return the games in reverse order
            return res.json(games.reverse());
        } catch (error) {
            // If something goes wrong, show an error
            return res.status(500).json({ msg: error });
        }
    },
    // Function for retrieving a game by ID
    getGameById: async (req, res) => {
        try {
            // Retrieve the Id from 'req.params'
            const { id } = req.params;

            // Retrieve the game by Id from the database
            const game = await Game.findById(id);

            // Create a formatted copy to modify the 'releaseDate' field
            const formattedGame = {
                ...game.toObject(),
                releaseDate: game.releaseDate.toISOString().split('T')[0],
            };

            // Return the formatted game in JSON format
            res.json(formattedGame);
        }
        catch (error) {
            // If something goes wrong, show an error
            return res.status(500).json({ msg: error });
        }
    },
    // Function for updating a game
    updateGame: async (req, res) => {
        try {
            // Retrieve the Id from 'req.params'
            const { id } = req.params;

            // Retrieve the game data from 'req.body'
            const updatedGameData = req.body;

            // Retrieve the game image from 'req.file'
            const updateGameImg = req.file;

            // Retrieve the game by Id from the database
            const currentGame = await Game.findById(id);

            // Retrieve a name for the game image without extension
            const fileNameWithoutExtension = currentGame.gameImg.replace(/\..+$/,'');

            if (updateGameImg && currentGame && currentGame.gameImg) {
                // Retrieve the correct url with 'path.resolve' and '__dirname' for an absolute url
                const imagePath = path.resolve(__dirname, '../../uploads/videogames', `${fileNameWithoutExtension}.webp`);
                // Retrieve the old image using 'fs.promises.unlink'
                await fs.promises.unlink(imagePath);
            }

            // Validate the game image
            if (updateGameImg) {
                // Assign the game image to the filename
                updatedGameData.gameImg = updateGameImg.filename;
            }

            // Find and update the game in the database
            const updatedGame = await Game.findByIdAndUpdate(id, updatedGameData,  {
                new: true,
            });

            // If the game is not found, show an error message
            if (!updatedGame) {
                return res.status(404).json({ message: 'Game no found' });
            }
            // Send the updated game as a success response
            res.status(200).json(updatedGame);
        }
        catch (error) {
            // If something goes wrong, show an error
            console.error("Error uploading game:", error);
            return res.status(500).json({ msg: error });
        }
    },
    // Function for deleting a game
    deleteGame: async (req, res) => {
        try {
            // Retrieve the Id from 'req.params'
            const { id } = req.params;

            // Retrieve the game by Id from the database
            const game = await Game.findById(id);

            // Retrieve a filename for the game image without extension
            const fileNameWithoutExtension = game.gameImg.replace(/\..+$/,'');

            // Retrieve the correct url with 'path.resolve' and '__dirname' for an absolute url
            const imagePath = path.resolve(__dirname, '../../uploads/videogames', `${fileNameWithoutExtension}.webp`);
            // Retrieve the old image using 'fs.promises.unlink'
            await fs.promises.unlink(imagePath);

            // Find and delete the game in the database
            await Game.findByIdAndDelete(id);

            // Send a success message as a response
            res.json({ msg: 'Game Deleted' });
        } catch (error) {
            // If something goes wrong, show an error
            console.error("Error deleting game:", error);
            return res.status(500).json({ msg: error });
        }
    },
    // Function for handling game filters
    filterGames: async (req, res) => {
        try {
            // Extract available filters  from 'req.query'
          const { genre, platform, developer, order, startDate, endDate} = req.query;
          
          // Save the base query
          let query = {};

          if (genre) {
            // Search for the genre in the chain using a regular expresssion 
            query.genre = { $regex: new RegExp(genre, 'i') };
          }

          if (platform) {
            // Search for the platform in the chain using a regular expresssion 
            query.platform = { $regex: new RegExp(platform, 'i') };
          }

        if(developer){
            // Search for the developer in the chain 
            query.developer = developer;
        }

        if (startDate && endDate) {
            // Filter games based on release date range
            query.releaseDate = {
              $gte: new Date(startDate),
              $lte: new Date(endDate),
            };
        }

        // Clean sort options
        const sortOptions = {};

        // Order by rating in ascending or descending order
        if (order === 'asc') {
            sortOptions.averageRating = 1;
        } else if (order === 'desc') {
            sortOptions.averageRating = -1;
        }

        // Search for games with the specified parameters (query) and apply sorting
        const filteredGames = await Game.find(query).sort(sortOptions);
            // Send the filtered games as a success response
            res.status(200).json(filteredGames);
        } catch (error) {
            // If something goes wrong, show an error
            // console.error('Error filtering games:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
      },
    
}
module.exports = controllerGame;