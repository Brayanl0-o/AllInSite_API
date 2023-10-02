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
    }
}
module.exports = controllerGame