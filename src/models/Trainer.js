const mongoose = require('mongoose')

const trainerSchema = mongoose.Schema({
    nombreEntrenador: {
        type: String,
        required: [true, 'Por favor teclea el nombre del entrenador']
    },
    correo: {
        type: String,
        required: [true, 'Por favor teclea el correo electrónico'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Por favor teclea tu contraseña']
    },
    metaUnova: {
        type: String,
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Trainer', trainerSchema)
