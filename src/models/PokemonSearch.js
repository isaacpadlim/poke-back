const mongoose = require('mongoose')

const pokemonSearchSchema = mongoose.Schema({
    pokemonId: {
        type: Number,
        required: [true, 'Por favor proporciona el ID del Pokémon'],
        unique: true
    },
    pokemonName: {
        type: String,
        required: [true, 'Por favor proporciona el nombre del Pokémon']
    },
    types: {
        type: [String],
        required: [true, 'Por favor proporciona los tipos del Pokémon']
    },
    image: {
        type: String
    },
    searchCount: {
        type: Number,
        default: 1
    },
    lastSearchedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('PokemonSearch', pokemonSearchSchema)
