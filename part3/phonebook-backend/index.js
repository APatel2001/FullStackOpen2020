const express = require('express')
const morgan = require('morgan')
const app = express()
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
const cors = require('cors')
app.use(cors())

const logger = require('heroku-logger')
logger.info('Starting server', { port: process.env.PORT })



morgan.token('body', (request, response) => {
  return JSON.stringify(request.body)
})

app.use(express.static('build'))


const Person = require('./models/person')

app.get('/api/persons', (request, response) => {
  Person.find({}).then(person => response.json(person))
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => response.json(person))
    .catch((error) => next(error))
})

app.get('/info', (request, response) => {
  Person.countDocuments({}, (err, count) => {
    console.log(count)
    response.send(`<p>Phonebook has info for ${count} people</p> <p>${new Date()}</p>`)
  })
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const person = request.body
  const p = new Person({
    name: person.name,
    number: person.number,
  })
  p
    .save()
    .then(p => response.json(p))
    .catch(error => next(error))
})


app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const person = {
    number: body.number
  }
  let opts = {
    runValidators: true,
    new: true
  }
  Person.findByIdAndUpdate(request.params.id, person, opts)
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})


const errorHandler = (error, request, response, next) => {
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    console.log('bad request')
    return response.status(400).send({ error: error.message })
  }
  next(error)
}

app.use(errorHandler)



const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})