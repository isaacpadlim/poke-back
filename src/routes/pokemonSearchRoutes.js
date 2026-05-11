const express = require('express')
const router = express.Router()
const { savePokemonSearch, getPopularSearches } = require('../controllers/pokemonSearchController')

router.post('/', savePokemonSearch)
router.get('/popular', getPopularSearches)

module.exports = router
