const express = require('express')
const router = express.Router()
const {
    getTrainers,
    getTrainer,
    setTrainer,
    updateTrainer,
    deleteTrainer
} = require('../controllers/trainerController')

router.route('/').get(getTrainers).post(setTrainer)
router.route('/:id').get(getTrainer).put(updateTrainer).delete(deleteTrainer)

module.exports = router
