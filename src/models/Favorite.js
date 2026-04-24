const mongoose = require('mongoose')

const favoriteSchema = mongoose.Schema({
    entrenadorId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Trainer'
    },
    nombrePokemon: {
        type: String,
        required: [true, 'Por favor proporciona el nombre del Pokémon']
    },
    numeroPokedex: {
        type: Number,
        required: [true, 'Por favor proporciona el número en la Pokédex']
    },
    tipoPrincipal: {
        type: String
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Favorite', favoriteSchema)
