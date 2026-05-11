const express = require('express')
const router = express.Router()
const { getFavorites, getFavoritesByTrainer, createFavorite, deleteFavorite } = require('../controllers/favoriteController')

router.route('/').get(getFavorites).post(createFavorite)
router.get('/trainer/:trainerId', getFavoritesByTrainer)
router.route('/:id').delete(deleteFavorite)

module.exports = router
