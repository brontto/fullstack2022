const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')

describe('some basic test', () => {

    beforeEach(async () => {
        await Blog.deleteMany({})
        await Blog.insertMany(helper.initialBlogs)

        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({ username: 'root', passwordHash })

        await user.save()   
    })


    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('identiefier is id', async () => {
        const response = await api.get('/api/blogs')

        expect(response.body[0].id).toBeDefined()

    })
    describe('validating stuff', () => {


        test('a blog can be added', async () => {
            user = {
                username: 'root',
                password: 'sekret'
            }

            const userToken = await api.post('/api/login')
                .send(user)
                .expect(200)
                .expect('Content-Type', /application\/json/)

            const token = userToken.body.token
          
            const newBlog = {
                title: 'Uusi Blogi',
                author: 'Pirkko Männistö',
                url: 'www.pirkonblogi.fi',
                likes: 7
            }

            await api
                .post('/api/blogs')
                .set({
                    Authorization: `Bearer ${token}`
                })
                .send(newBlog)
                .expect(201)
                .expect('Content-Type', /application\/json/)

            const blogsAtEnd = await helper.blogsInDb()
            expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

            const titles = blogsAtEnd.map(b => b.title)
            expect(titles).toContain(
                'Uusi Blogi'
            )

        })

        test('cannot add blog if there is no token', async () => {
            const newBlog = {
                title: 'Uusi Blogi',
                author: 'Pirkko Männistö',
                url: 'www.pirkonblogi.fi',
                likes: 7
            }


            await api
                .post('/api/blogs')
                .send(newBlog)
                .expect(401)
                .expect('Content-Type', /application\/json/)

            const blogsAtEnd = await helper.blogsInDb()
            expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

            const titles = blogsAtEnd.map(b => b.title)
            expect(titles).not.toContain(
                'Uusi Blogi'
            )
        })

        test('field "likes" have value 0 if not initialized', async () => {
            user = {
                username: 'root',
                password: 'sekret'
            }

            const userToken = await api.post('/api/login')
                .send(user)
                .expect(200)
                .expect('Content-Type', /application\/json/)

            const token = userToken.body.token
            
            const newBlog = {
                title: 'Epäsuosittu Blogi',
                author: 'Salainen Kalle',
                url: 'alaluetataskeidaa.com',
            }

            await api
                .post('/api/blogs')
                .set({
                    Authorization: `Bearer ${token}`
                })
                .send(newBlog)
                .expect(201)
                .expect('Content-Type', /application\/json/)

            const blogsAtEnd = await helper.blogsInDb()
            const rightBlog = blogsAtEnd.find(blog => blog.title === 'Epäsuosittu Blogi')
            expect(rightBlog.likes).toBe(0)

        })


        test('a invalid blog cant be added', async () => {
            user = {
                username: 'root',
                password: 'sekret'
            }

            const userToken = await api.post('/api/login')
                .send(user)
                .expect(200)
                .expect('Content-Type', /application\/json/)

            const token = userToken.body.token

            const urlLessBlog = {
                title: 'Bloggendeerus',
                author: 'Martti'
            }
            await api
                .post('/api/blogs')
                .set({
                    Authorization: `Bearer ${token}`
                })
                .send(urlLessBlog)
                .expect(400)

            const tittLessBlog = {
                author: 'Kalle Makkonen',
                url: 'Kallenblogi',
                likes: 5
            }

            await api
                .post('/api/blogs')
                .send(tittLessBlog)
                .set({
                    Authorization: `Bearer ${token}`
                })
                .expect(400)

        })
    })

    describe('deleting stuff', () => {

        test('deleting blog by id', async () => {
            user = {
                username: 'root',
                password: 'sekret'
            }

            const userToken = await api.post('/api/login')
                .send(user)
                .expect(200)
                .expect('Content-Type', /application\/json/)

            const token = userToken.body.token
            
            const newBlog = {
                title: 'Uusi Blogi',
                author: 'Pirkko Männistö',
                url: 'www.pirkonblogi.fi',
                likes: 7
            }

            const deletedSoonBlog = await api
                .post('/api/blogs')
                .set({
                    Authorization: `Bearer ${token}`
                })
                .send(newBlog)
                .expect(201)
                .expect('Content-Type', /application\/json/)
            


            await api
                .delete(`/api/blogs/${deletedSoonBlog.body.id}`)
                .set({
                    Authorization: `Bearer ${token}`
                })
                .expect(204)

            const blogsAtEnd = await helper.blogsInDb()

            const titles = blogsAtEnd.map(b => b.title)

            expect(titles).not.toContain(deletedSoonBlog.title)
        })

        
    })

    describe('updating stuff', () => {

        test('update blog by id', async () => {
            const blogsAtStart = await helper.blogsInDb()
            const blogToChange = blogsAtStart[0]
            
            const changes = {
                likes: blogToChange.likes + 1
            }

            await api
                .put(`/api/blogs/${blogToChange.id}`)
                .send(changes)
                .expect(200)

            const blogsAtEnd = await helper.blogsInDb()

            const changedBlog = blogsAtEnd.find(blog => blog.title === blogToChange.title)
            expect(changedBlog.likes).toBe(blogToChange.likes+1)

            
        })
    })
})

afterAll(() => {
    mongoose.connection.close()
})