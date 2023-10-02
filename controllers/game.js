// const { default: mongoose } = require('mongoose')
const Game = require('../models/game')

const controllerGame = {
    create: async (req, res) => {
        try {
            const { gameName, gameImg, platform, releaseDate, developer, genre, avergaRating } = req.body

            const game = new Game({
                gameName,
                gameImg,
                platform,
                releaseDate,
                developer,
                genre,
                avergaRating
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
            return res.status(200).json(games);
            // res.json(games.reverse());
        } catch (error) {
            return res.status(500).json({ msg: error })
        }
    },
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
    }

}
module.exports = controllerGame