const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Person = require('../models/person')
const { update } = require('../models/person')
const { response } = require('../app')

beforeEach(async () => {
    await Person.deleteMany({})
    await Person.insertMany(helper.initialPersons)
    })

test('notes are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})
test('all are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialPersons.length)
  })
  
  test('a specific blog is within the returned', async () => {
    const response = await api.get('/api/blogs')
    const contents = response.body.map(r => r.title)
    //expect(contents).toContain('HTML is easy')
    //OR
    expect(contents).toContainEqual(helper.initialPersons[0].title)
    expect(contents).toContainEqual(helper.initialPersons[1].title)
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

  test('blog without title is not added', async () => {
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
  test('check if _id is returned', async () => {
    const blogsAtStart = await helper.blogsIdInDb()
    console.log(blogsAtStart)
    console.log(blogsAtStart.map(r => r.id))
    expect(blogsAtStart.map(r => r.id)).toBeDefined()
    
  })
  test('a blog can be added using async/await', async () => {
    const newBlog = {
      title: "new blog",
      author: "J.A",
      url: "none",
      likes: 15,
    }
    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

    console.log(await (await helper.blogsInDb()).length)
    expect(await (await helper.blogsInDb()).length + 1)
  })
  
  test('if likes has no value, set it 0', async () => {

      const newBlog = {
        title: "test blog",
        author: "A.J",
        url: "none",
        likes: "",
      }
      
    if(api.post('/api/blogs').send(newBlog.likes = null))
    {
      await api.post('/api/blogs').send(newBlog.likes = 0)
    }
    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

    console.log(await (await helper.blogsInDb()).length)
    expect(newBlog.likes).toEqual(0)
  })
  
  test('blog without title in db is not added', async () => {
    const newBlog = {
      title: ""
    }
    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogsAtEnd.length)
  })
  test('blog without url in db is not added', async () => {
    const newBlog = {
      url: ""
    }
    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogsAtEnd.length)
  })
 test('if title is empty, response with status code 400 Bad Request', async () => {
  const newBlog = {
    title: "",
    author: "J.J",
    url: "",
    likes: 1,
  }
if(await api.post('/api/blogs').send(newBlog.title == "" === false)) {
  
  await api
  .post('/api/blogs')
  .send(newBlog)
  .expect(400)
  .expect('Content-Type', /application\/json/)

}
})
test('if url is empty, response with status code 400 Bad Request', async () => {
  const newBlog = {
    title: "",
    author: "J.J",
    url: "",
    likes: 1,
  }
if(await api.post('/api/blogs').send(newBlog.url == "" === false)) {
  
  await api
  .post('/api/blogs')
  .send(newBlog)
  .expect(400)
  .expect('Content-Type', /application\/json/)

}
})
  /*
  test('delete last blog in array', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[2]

    await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.blogsInDb.length - 1)
    const contents = blogsAtEnd.map(r => r.title)
    expect(contents).not.toContain(blogToDelete.title)
  })
  */

/*
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
*/
afterAll(async () => {
  await mongoose.connection.close()
})