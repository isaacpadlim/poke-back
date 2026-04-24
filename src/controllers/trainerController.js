const asyncHandler = require('express-async-handler')
const Trainer = require('../models/Trainer')

// obtener entrenadores
const getTrainers = asyncHandler(async (req, res) => {
    const trainers = await Trainer.find()
    res.status(200).json(trainers)
})

//obtener un entrenador por ID
const getTrainer = asyncHandler(async (req, res) => {
    const trainer = await Trainer.findById(req.params.id)

    if (!trainer) {
        res.status(404)
        throw new Error('Entrenador no encontrado')
    }

    res.status(200).json(trainer)
})

//crear un nuevo entrenador
const setTrainer = asyncHandler(async (req, res) => {
    const { nombreEntrenador, correo, metaUnova, regionFavorita, pokemonFavorito } = req.body

    if (!nombreEntrenador || !correo || !metaUnova) {
        res.status(400)
        throw new Error('Por favor teclea los campos obligatorios: nombreEntrenador, correo, metaUnova')
    }

    const trainer = await Trainer.create({
        nombreEntrenador,
        correo,
        metaUnova,
        regionFavorita: regionFavorita || 'Unova',
        pokemonFavorito: pokemonFavorito || 'Pikachu'
    })

    res.status(201).json(trainer)
})

//actualizar un entrenador
const updateTrainer = asyncHandler(async (req, res) => {
    const trainer = await Trainer.findById(req.params.id)

    if (!trainer) {
        res.status(404)
        throw new Error('Entrenador no encontrado')
    }

    const updatedTrainer = await Trainer.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    )

    res.status(200).json(updatedTrainer)
})

//eliminar un entrenador
const deleteTrainer = asyncHandler(async (req, res) => {
    const trainer = await Trainer.findById(req.params.id)

    if (!trainer) {
        res.status(404)
        throw new Error('Entrenador no encontrado')
    }

    await trainer.deleteOne()

    res.status(200).json({ id: req.params.id })
})

module.exports = {
    getTrainers,
    getTrainer,
    setTrainer,
    updateTrainer,
    deleteTrainer
}
