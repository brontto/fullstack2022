const config = require('../utils/config')
const mongoose = require('mongoose')

mongoose.connect(config.MONGODB_URI)
.then(() => {
  console.log('connected to MongoDB')
})
.catch((error) => {
  console.log('error connecting to MongoDB:', error.message)
})


const blogSchema = mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
  })
  
  module.exports = mongoose.model('Blog', blogSchema)
  
  