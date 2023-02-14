const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Person = require('../models/person')
/*
const initialPersons = [
    {
        title: 'HTML is easy',
        author: "Masa"
    },
    {
        title: 'Browser can execute only Javascript',
        author: "Keijo"
    },
]
*/
beforeEach(async () => {
    await Person.deleteMany({})
    await Person.insertMany(helper.initialPersons)
    })

test('notes are returned as json', async () => {
  await api
    .get('/api/blogs') //notes
    .expect(200)
    .expect('Content-Type', /application\/json/)
})
test('all are returned', async () => {
    const response = await api.get('/api/blogs')
    //console.log(initialPersons.length)
    expect(response.body).toHaveLength(helper.initialPersons.length)
  })
  
  test('a specific blog is within the returned', async () => {
    const response = await api.get('/api/blogs')
    const contents = response.body.map(r => r.title)
    expect(contents).toContain('HTML is easy') 
  })

  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'async/await simplifies making async calls',
      author: 'ASYNC/AWAITtest'
    }
    
    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialPersons.length + 1)

    //const response = await api.get('/api/blogs')
    const contents = blogsAtEnd.map(r => r.title)

    expect(contents).toContain('async/await simplifies making async calls')
  })

  test('blog without content is not added', async () => {
    const newBlog = {
      title: ""
    }
    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialPersons.length)
  })
  test('a specific blog can be viewed', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToView = blogsAtStart[0]
    const resultBlog = await api
    .get(`/api/blogs/${blogToView.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)

    expect(resultBlog.body).toEqual(blogToView)
  })

  test('a blog can be deleted', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialPersons.length - 1)
    const contents = blogsAtEnd.map(r => r.title)
    expect(contents).not.toContain(blogToDelete.title)
  })

afterAll(async () => {
  await mongoose.connection.close()
})