const personsRouter = require('express').Router()
const Contact = require('../models/person')

//Info
/*
personsRouter.get('/', (request, response) => {
    response.send('<h1>Hello world</h1>')
    response.end(JSON.stringify(infos))
  })
  personsRouter.get('/api/infos/:id', (request, response) => {
    const id = Number(request.params.id)
    const info = infos.find(info => info.id === id)
    if(info) {
      response.json(info)
    } else {
      response.status(404).end()
    }
  }) 
  
  personsRouter.get('/api/infos', (request, response) => {
    const hello = Contact.find({}).then(persons => {
      let infos = [
        {
          text: `Phonebook has info for ${persons.length} people`, 
          date: Date(),
        },
      ]
      
      response.json(infos)
    })
    
    console.log(hello)
    
  })
  */

  //Persons

  /*
  personsRouter.get('/', (request, response) => {
    response.send('<h1>Hello world</h1>')
    response.end(JSON.stringify(persons))
  })
*/
personsRouter.get('/', (request, response) => {
    Contact.find({}).then(persons => {
        response.json(persons)
    })
  })

  personsRouter.get('/:id', (request, response, next) => {
    Contact.findById(request.params.id)
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
  
  personsRouter.get('/api/persons', (request, response) => {
    Contact.find({}).then(persons => {
    response.json(persons)
  })
  })
  
  personsRouter.delete('/:id', (request, response, next) => {
    Contact.findByIdAndRemove(request.params.id)
    .then(result => {
        response.status(204).end()
    })
    .catch(error => next(error))
  
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    //Jos poisto onnistuu vastataan statuskoodilla 204.
    response.status(204).end()
  })
  
  const generateID = () => {
    const randomID = persons.length > 0
    ? Math.random(...persons.map(p => p.id))
    : 0
    let randomiidee = randomID * 100
    return Math.round(randomiidee)
  }
  personsRouter.post('/', (request, response, next) => {
    const body = request.body
  
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
    persons = persons.concat(person)
  
    person.save().then(savedPerson => {
      response.json(savedPerson)
    })
    .catch(error => next(error))
  })
  
  personsRouter.put('/:id', (request, response, next) => {
    const {name, number, important} = request.body
    Contact.findByIdAndUpdate(request.params.id, {name, number, important}, {new: true, runValidators: true, context: "query "})
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
  })

  module.exports = personsRouter