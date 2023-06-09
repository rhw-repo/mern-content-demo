// package, loads sensitive environment variables from .env file into process.env object 
require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
// provides routes for materials
const materialRoutes = require('./routes/materials')
const userRoutes = require('./routes/user')
mongoose.set('strictQuery', true);

// express app
const app = express()

// middleware
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes
app.use('/api/materials', materialRoutes)
app.use('/api/user', userRoutes)

// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('connected to database')
    // listen to port
    app.listen(process.env.PORT, () => {
      console.log('listening for requests on port', process.env.PORT)
    })
  })
  .catch((error) => {
    console.log(error)
  }) 