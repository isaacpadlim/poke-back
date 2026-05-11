const asyncHandler = require('express-async-handler')
const PokemonSearch = require('../models/PokemonSearch')

// @desc    Guardar o actualizar búsqueda de Pokémon
// @route   POST /api/pokemon-searches
// @access  Public
const savePokemonSearch = asyncHandler(async (req, res) => {
    const { pokemonId, pokemonName, types, image } = req.body

    if (!pokemonId || !pokemonName || !types) {
        res.status(400)
        throw new Error('Por favor proporciona todos los campos necesarios (pokemonId, pokemonName, types)')
    }

    // Buscar si ya existe el pokemonId
    let pokemonSearch = await PokemonSearch.findOne({ pokemonId })

    if (pokemonSearch) {
        // Actualizar
        pokemonSearch.searchCount += 1
        pokemonSearch.lastSearchedAt = Date.now()
        await pokemonSearch.save()
        res.status(200).json(pokemonSearch)
    } else {
        // Crear
        pokemonSearch = await PokemonSearch.create({
            pokemonId,
            pokemonName,
            types,
            image
        })
        res.status(201).json(pokemonSearch)
    }
})

// @desc    Obtener Pokémon más buscados
// @route   GET /api/pokemon-searches/popular
// @access  Public
const getPopularSearches = asyncHandler(async (req, res) => {
    const popular = await PokemonSearch.find().sort({ searchCount: -1 }).limit(5)
    res.status(200).json(popular)
})

module.exports = {
    savePokemonSearch,
    getPopularSearches
}
