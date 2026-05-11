const express = require('express')
const router = express.Router()
const { getTrainers, getTrainer, createTrainer, loginTrainer, updateTrainer, deleteTrainer } = require('../controllers/trainerController')

router.route('/').get(getTrainers).post(createTrainer)
router.post('/login', loginTrainer)
router.route('/:id').get(getTrainer).put(updateTrainer).delete(deleteTrainer)

module.exports = router
