const asyncHandler = require('express-async-handler')
const Trainer = require('../models/Trainer')
const Favorite = require('../models/Favorite')

// Obtener entrenadores
const getTrainers = asyncHandler(async (req, res) => {
    const trainers = await Trainer.find().select('-password')
    res.status(200).json(trainers)
})

// Obtener un entrenador
const getTrainer = asyncHandler(async (req, res) => {
    const trainer = await Trainer.findById(req.params.id).select('-password')
    if (!trainer) {
        res.status(404)
        throw new Error('Entrenador no encontrado')
    }
    res.status(200).json(trainer)
})

// Crear entrenador (Registro)
const createTrainer = asyncHandler(async (req, res) => {
    const { nombreEntrenador, correo, password, metaUnova } = req.body

    if (!nombreEntrenador || !correo || !password) {
        res.status(400)
        throw new Error('Por favor teclea nombre, correo y contraseña')
    }

    // Evitar duplicados
    const trainerExists = await Trainer.findOne({ correo })
    if (trainerExists) {
        res.status(400)
        throw new Error('Ya existe un entrenador registrado con este correo')
    }

    const trainer = await Trainer.create({
        nombreEntrenador,
        correo,
        password,
        metaUnova
    })

    if (trainer) {
        res.status(201).json({
            _id: trainer._id,
            nombreEntrenador: trainer.nombreEntrenador,
            correo: trainer.correo,
            metaUnova: trainer.metaUnova
        })
    } else {
        res.status(400)
        throw new Error('Datos no válidos')
    }
})

// Login de entrenador
const loginTrainer = asyncHandler(async (req, res) => {
    const { correo, password } = req.body

    if (!correo || !password) {
        res.status(400)
        throw new Error('Por favor teclea correo y contraseña')
    }

    const trainer = await Trainer.findOne({ correo, password })

    if (trainer) {
        res.status(200).json({
            message: "Login correcto",
            trainer: {
                _id: trainer._id,
                nombreEntrenador: trainer.nombreEntrenador,
                correo: trainer.correo,
                metaUnova: trainer.metaUnova
            }
        })
    } else {
        res.status(401)
        throw new Error('Correo o contraseña incorrectos')
    }
})

// Modificar entrenador
const updateTrainer = asyncHandler(async (req, res) => {
    const trainer = await Trainer.findById(req.params.id)

    if (!trainer) {
        res.status(404)
        throw new Error('Entrenador no encontrado')
    }

    const updatedTrainer = await Trainer.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('-password')
    res.status(200).json(updatedTrainer)
})

// Eliminar entrenador y sus favoritos
const deleteTrainer = asyncHandler(async (req, res) => {
    const trainer = await Trainer.findById(req.params.id)

    if (!trainer) {
        res.status(404)
        throw new Error('Entrenador no encontrado')
    }

    // Borrado en cascada
    await Favorite.deleteMany({ trainerId: req.params.id })
    await trainer.deleteOne()

    res.status(200).json({ message: "Entrenador y favoritos eliminados correctamente" })
})

module.exports = {
    getTrainers,
    getTrainer,
    createTrainer,
    loginTrainer,
    updateTrainer,
    deleteTrainer
}
