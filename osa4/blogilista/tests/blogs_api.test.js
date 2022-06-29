const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

describe('some basic test', () => {

    beforeEach(async () => {
        await Blog.deleteMany({})
        await Blog.insertMany(helper.initialBlogs)
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
            const newBlog = {
                title: 'Uusi Blogi',
                author: 'Pirkko Männistö',
                url: 'www.pirkonblogi.fi',
                likes: 7
            }

            await api
                .post('/api/blogs')
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

        test('field "likes" have value 0 if not initialized', async () => {
            const newBlog = {
                title: 'Epäsuosittu Blogi',
                author: 'Salainen Kalle',
                url: 'alaluetataskeidaa.com',
            }

            await api
                .post('/api/blogs')
                .send(newBlog)
                .expect(201)
                .expect('Content-Type', /application\/json/)

            const blogsAtEnd = await helper.blogsInDb()
            const rightBlog = blogsAtEnd.find(blog => blog.title === 'Epäsuosittu Blogi')
            expect(rightBlog.likes).toBe(0)

        })


        test('a invalid blog cant be added', async () => {
            const urlLessBlog = {
                title: 'Bloggendeerus',
                author: 'Martti'
            }
            await api
                .post('/api/blogs')
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
                .expect(400)

        })
    })

    describe('deleting stuff', () => {

        test('deleting blog by id', async () => {
            const blogsAtStart = await helper.blogsInDb()
            const blogToDelete = blogsAtStart[0]

            await api
                .delete(`/api/blogs/${blogToDelete.id}`)
                .expect(204)

            const blogsAtEnd = await helper.blogsInDb()

            expect(blogsAtEnd).toHaveLength(
                helper.initialBlogs.length - 1
            )

            const titles = blogsAtEnd.map(b => b.title)

            expect(titles).not.toContain(blogToDelete.title)
        })
    })
})

afterAll(() => {
    mongoose.connection.close()
})