const Game = require('../models/game')

const controllerGame = {
    create: async (req, res) => {
        try {
            const { gameName, gameImg, platform, releaseDate, developer, genre, averageRating } = req.body

            const game = new Game({
                gameName,
                gameImg,
                platform,
                releaseDate,
                developer,
                genre,
                averageRating
            })

            // Guardar el juego en la base de datos
            const savedGame = await game.save();

            return res.status(200).json({ savedGame })
        }
        catch (error) {
            return res.status(500).json({ msg: error })
        }
    },
    getGame: async (req, res) => {
        try {
            const games = await Game.find({})
            // return res.status(200).json(games);
            return res.json(games.reverse());
        } catch (error) {
            return res.status(500).json({ msg: error })
        }
    },
    // getGame: async (req, res) => {
    //     try {

    //         const page = parseInt(req.query.page) || 1; // Obtiene el número de páagina de la consulta o usa 1 por defecto
    //         const itemsPerPage = parseInt(req.query.itemsPerPage) || 9; // Obtiene la cantidad por página o usa 10 por defecto

    //         const skip = (page - 1) * itemsPerPage

    //         const games = await Game.find({})
    //             .skip(skip)
    //             .limit(itemsPerPage);

    //         const totalGames = await Game.countDocuments();   
    //        // Revertir el arreglo de juegos
    //         const reversedGames = games.reverse();

    //         res.json({
    //             games: reversedGames,
    //             currentPage: page,
    //             totalPages: Math.ceil(totalGames / itemsPerPage)
    //           });
    //         // res.json(games.reverse());
    //         // return res.status(200).json(games);
    //     } catch (error) {
    //         return res.status(500).json({ error: 'Error interno del servidor' })
    //     }
    // },
    getGameById: async (req, res) => {
        try {
            const { id } = req.params
            const game = await Game.findById(id)
            res.json(game)
        }
        catch (error) {
            return res.status(500).json({ msg: error })
        }
    },
    updateGame: async (req, res) => {
        try {
            const { id } = req.params;
            const updatedGameData = req.body;

            const updatedGame = await Game.findByIdAndUpdate(id, updatedGameData, {
                new: true,
            });
            if (!updatedGame) {
                return res.status(404).json({ message: 'Juego no encontrado' });
            }

            // Enviar el usuario actualizado como respuesta
            res.status(200).json(updatedGame);
        }
        catch (error) {
            return res.status(500).json({ msg: error })
        }
    },
    deleteGame: async (req, res) => {
        try {
            const { id } = req.params
            await Game.findByIdAndDelete(id)
            res.json({ msg: 'Game Deleted' })
        } catch (error) {
            return res.status(500).json({ msg: error })
        }
    },
    filterGames: async (req, res) => {
        try {
          const { genre, platform, developer, order, startDate, endDate} = req.query;
          
          let query = {};
      
          if (genre) {
            query.genre = { $regex: new RegExp(genre, 'i') };;
          }
      
          if (platform) {
            // Utiliza una expresión regular para buscar la plataforma en la cadena.
            query.platform = { $regex: new RegExp(platform, 'i') };
          }

        if(developer){
                query.developer = developer;
        }

        if (startDate && endDate) {
            query.releaseDate = {
              $gte: new Date(startDate),
              $lte: new Date(endDate),
            };
        }

        const sortOptions = {};
        
        // Ordenar por calificación ascendente o descendente
        if (order === 'asc') {
        sortOptions.averageRating = 1; 
        } else if (order === 'desc') {
        sortOptions.averageRating = -1; 
        }

          const filteredGames = await Game.find(query).sort(sortOptions);
      
          res.status(200).json(filteredGames);
        } catch (error) {
          res.status(500).json({ error: 'Internal Server Error' });
        }
      }
}
module.exports = controllerGame