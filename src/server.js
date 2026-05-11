const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const cors = require('cors')
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')

const port = process.env.PORT || 5001

connectDB()

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//rutas
app.use('/api/trainers', require('./routes/trainerRoutes'))
app.use('/api/favorites', require('./routes/favoriteRoutes'))
app.use('/api/pokemon-searches', require('./routes/pokemonSearchRoutes'))

app.use(errorHandler)

app.listen(port, () => console.log(`Servidor iniciado en el puerto ${port}`.yellow.bold))
