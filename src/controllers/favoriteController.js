const asyncHandler = require('express-async-handler')
const Favorite = require('../models/Favorite')

// Obtener todos los favoritos
const getFavorites = asyncHandler(async (req, res) => {
    const favorites = await Favorite.find().populate('trainerId', 'nombreEntrenador')
    res.status(200).json(favorites)
})

// Obtener equipo de un entrenador
const getFavoritesByTrainer = asyncHandler(async (req, res) => {
    const favorites = await Favorite.find({ trainerId: req.params.trainerId })
    res.status(200).json(favorites)
})

// Crear favorito (Agregar a mi equipo)
const createFavorite = asyncHandler(async (req, res) => {
    const { trainerId, pokemonId, pokemonName, types, image } = req.body

    if (!trainerId || !pokemonId || !pokemonName) {
        res.status(400)
        throw new Error('Por favor teclea trainerId, pokemonId y pokemonName')
    }

    // Validar máximo 6 Pokémon
    const teamCount = await Favorite.countDocuments({ trainerId })
    if (teamCount >= 6) {
        res.status(400)
        throw new Error('Tu equipo está completo. Elimina un Pokémon antes de agregar otro.')
    }

    // Evitar duplicados en el mismo equipo
    const favoriteExists = await Favorite.findOne({ trainerId, pokemonId })
    if (favoriteExists) {
        res.status(400)
        throw new Error('Este Pokémon ya está en tu equipo.')
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

// Eliminar favorito
const deleteFavorite = asyncHandler(async (req, res) => {
    const favorite = await Favorite.findById(req.params.id)

    if (!favorite) {
        res.status(404)
        throw new Error('Pokémon no encontrado en el equipo')
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
