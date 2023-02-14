const blogRouter = require('express').Router()
const Blog = require('../models/person')

let persons = [
    {
      id: 1,
      name: "Keijo Kuusinen",
      number: "0501231231",
    },
    {
      id: 2,
      name: "Martti Koisola",
      number: "0501231232",
    },
    {
      id: 3,
      name: "Seppo Taalasmaa",
      number: "0501231233",
    },
    {
      id: 4,
      name: "Jarmo",
      number: "035023035",
    },
  ]
  /*
  blogRouter.get('/', (request, response) => {
    Blog.find({}).then(persons => {
    response.json(persons)
  })
  })
  */

  blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})   
    response.json(blogs)
  })
  
  blogRouter.get('/:id', async (request, response) => { // morgan('tiny'),
    const blog = await Blog.findById(request.params.id)
     if(blog) {
      //console.log(person.id)
      response.json(blog)
     }
     else {
      response.status(201).json(savedBlog)
     }
})
  /*
  blogRouter.get('/:id', async (request, response, next) => { // morgan('tiny'),
    try {
    const blog = await Blog.findById(request.params.id)
     if(person) {
      //console.log(person.id)
      response.json(person)
     }
     else {
      response.status(404).end()
     }
    } catch(exception) {
      next(exception)
  }
})
*/
  /*
  blogRouter.get('/:id', (request, response, next) => { // morgan('tiny'),
    Blog.findById(request.params.id)
    .then(person => {
     if(person) {
      console.log(person.id)
      response.json(person)
     }
     else {
      response.status(404).end()
     }
    })
    .catch(error => next(error))
})
*/

const generateID = () => {
    const randomID = persons.length > 0
    ? Math.random(...persons.map(p => p.id))
    : 0
    let randomiidee = randomID * 100
    return Math.round(randomiidee)
  }
  blogRouter.post('/', async (request, response) => { //'api/persons'
    const body = request.body

    if (body.title === undefined) {
      return response.status(400).json({
        error: 'title missing'
      })
    }
    if(!body.title) {
      return response.status(400).json({
        error: 'title missing'
      })
    }
    if(body.author === undefined) {
      return response.status(400).json({
        error: 'author missing'
      })
    }
    if(!body.author) {
      return response.status(400).json({
        error: 'author is missing'
      })
    }
    if( persons.findIndex((p) => p.title == body.title) != -1) {
      return response.status(400).json({
        error: 'title already exists'
      })
    }
    const person = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
    })
  /*
    if (body.name === undefined) {
      return response.status(400).json({
        error: 'name missing'
      })
    }
    if(!body.name) {
      return response.status(400).json({
        error: 'name missing'
      })
    }
    if(body.number === undefined) {
      return response.status(400).json({
        error: 'number missing'
      })
    }
    if(!body.number) {
      return response.status(400).json({
        error: 'number is missing'
      })
    }
    if( persons.findIndex((p) => p.name == body.name) != -1) {
      return response.status(400).json({
        error: 'name already exists'
      })
    }
    const person = new Contact({
      name: body.name,
      number: body.number,
      important: body.important || false,
      id: generateID(),
    })
    */
    persons = persons.concat(person)
    //const savedBlog = await person.save()
    //  response.json(savedBlog)
    //})
    
    
    const savedBlog = await person.save()
    response.status(201).json(savedBlog)
  })
  
    /*
    person.save().then(savedPerson => {
      response.status(201).json(savedPerson)
    })
    .catch(error => next(error))
  })
*/
/*
  blogRouter.delete('/:id', (request, response, next) => {
    Blog.findByIdAndRemove(request.params.id)
    .then(result => {
        response.status(204).end()
    })
    .catch(error => next(error))
  
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    //Jos poisto onnistuu vastataan statuskoodilla 204.
    response.status(204).end()
  })
*/
blogRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndRemove(request.params.id)
        response.status(204).end()
  
    //const id = Number(request.params.id)
    //persons = persons.filter(person => person.id !== id)
    //Jos poisto onnistuu vastataan statuskoodilla 204.
    //response.status(204).end()
  })
  

  blogRouter.put('/:id', (request, response, next) => {
    const {name, number, important} = request.body
    Blog.findByIdAndUpdate(request.params.id, {name, number, important}, {new: true, runValidators: true, context: "query "})
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
  })

module.exports = blogRouter