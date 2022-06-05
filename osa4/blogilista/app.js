const config = require('./utils/config')
const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const blogRouter = require('./controllers/blogs')
const mongoose = require('mongoose')



app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogRouter)

module.exports = app