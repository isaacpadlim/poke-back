const asyncHandler = require('express-async-handler')
const Favorite = require('../models/Favorite')

// @desc    Obtener todos los favoritos
// @route   GET /api/favorites
// @access  Public
const getFavorites = asyncHandler(async (req, res) => {
    const favorites = await Favorite.find().populate('trainerId', 'nombreEntrenador')
    res.status(200).json(favorites)
})

// @desc    Obtener favoritos de un entrenador
// @route   GET /api/favorites/trainer/:trainerId
// @access  Public
const getFavoritesByTrainer = asyncHandler(async (req, res) => {
    const favorites = await Favorite.find({ trainerId: req.params.trainerId })
    res.status(200).json(favorites)
})

// @desc    Crear un favorito
// @route   POST /api/favorites
// @access  Public
const createFavorite = asyncHandler(async (req, res) => {
    const { trainerId, pokemonId, pokemonName, types, image } = req.body

    if (!trainerId || !pokemonId || !pokemonName) {
        res.status(400)
        throw new Error('Por favor teclea trainerId, pokemonId y pokemonName')
    }

    // Verificar si ya existe este favorito para este entrenador
    const favoriteExists = await Favorite.findOne({ trainerId, pokemonId })

    if (favoriteExists) {
        res.status(400)
        throw new Error('Este entrenador ya tiene a este Pokémon en sus favoritos')
    }

    const favorite = await Favorite.create({
        trainerId,
        pokemonId,
        pokemonName,
        types,
        image
    })
    res.status(201).json(favorite)
})

// @desc    Eliminar un favorito
// @route   DELETE /api/favorites/:id
// @access  Public
const deleteFavorite = asyncHandler(async (req, res) => {
    const favorite = await Favorite.findById(req.params.id)

    if (!favorite) {
        res.status(404)
        throw new Error('Favorito no encontrado')
    }

    await favorite.deleteOne()

    res.status(200).json({ id: req.params.id })
})

module.exports = {
    getFavorites,
    getFavoritesByTrainer,
    createFavorite,
    deleteFavorite
}
