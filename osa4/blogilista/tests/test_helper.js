const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
        title: "HuippuBlogi",
        author: "Jaska Pekkanen",
        url: "www.jaskanblogi.org",
        likes: 1
    },
    {
        title: "Autoblogi",
        author: "Pekka Automies",
        url: "www.autotonkivoja.fi",
        likes: 0
    }
]


const nonExistingId = async () => {
    const blog = new Blog({title: "title", url: "urli tähän"})
    await blog.save()
    await blog.remove()
    return blog._id.toString()

}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

module.exports = {
    initialBlogs, nonExistingId, blogsInDb, usersInDb
}