const asyncHandler = require('express-async-handler')
const Favorite = require('../models/Favorite')
const Trainer = require('../models/Trainer')

//obtener favoritos
const getFavorites = asyncHandler(async (req, res) => {
    const favorites = await Favorite.find().populate('entrenadorId', 'nombreEntrenador correo')
    res.status(200).json(favorites)
})

//obtener un favorito por id
const getFavorite = asyncHandler(async (req, res) => {
    const favorite = await Favorite.findById(req.params.id).populate('entrenadorId', 'nombreEntrenador correo')

    if (!favorite) {
        res.status(404)
        throw new Error('Favorito no encontrado')
    }

    res.status(200).json(favorite)
})

//crear un nuevo favorito
const setFavorite = asyncHandler(async (req, res) => {
    const { nombrePokemon, numeroPokedex, tipoPrincipal, entrenadorId } = req.body

    if (!nombrePokemon || !numeroPokedex || !entrenadorId) {
        res.status(400)
        throw new Error('Por favor proporciona los campos obligatorios')
    }

    //verificar si existe el entrenador
    const trainerExists = await Trainer.findById(entrenadorId)
    if (!trainerExists) {
        res.status(404)
        throw new Error('El entrenador asociado no existe')
    }

    const favorite = await Favorite.create({
        nombrePokemon,
        numeroPokedex,
        tipoPrincipal,
        entrenadorId
    })

    res.status(201).json(favorite)
})

//actualizar un favorito
const updateFavorite = asyncHandler(async (req, res) => {
    const favorite = await Favorite.findById(req.params.id)

    if (!favorite) {
        res.status(404)
        throw new Error('Favorito no encontrado')
    }

    const updatedFavorite = await Favorite.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    )

    res.status(200).json(updatedFavorite)
})

//eliminar un favorito
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
    getFavorite,
    setFavorite,
    updateFavorite,
    deleteFavorite
}
