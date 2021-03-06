const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { userExtractor } = require('../utils/middleware')


blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1})
    response.json(blogs)
})

blogRouter.get('/:id', async (request, response) => {
    const blogs = await Blog.findById(request.params.id).populate('user', { username: 1, name: 1})
    response.json(blogs)
})

blogRouter.post('/', userExtractor, async (request, response) => {
    const body = new Blog(request.body)

    const user = request.user

    const blog = new Blog({
        title: body.title,
        author: body.author || '',
        url: body.url,
        likes: body.likes || 0,
        user: user._id,
    })

    const savedBlog = await blog.save()
    
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    
    response.status(201).json(savedBlog)
})

blogRouter.delete('/:id', userExtractor ,async (request, response) => {
    const user = request.user

    const blog = await Blog.findById(request.params.id)
    if(blog.user.toString() !== user.id.toString()){
        return response.status(403).json({
            error: 'acces denied'
        })
    }
    
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
    const { title, author, url, likes} = request.body

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id,
        { title, author, url, likes },
        { new: true, runValidators: true, context: 'query' }
    )
    response.status(200).json(updatedBlog)
})

module.exports = blogRouter