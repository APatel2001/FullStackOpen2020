const { request, response } = require("express")
const express = require("express")
const morgan = require('morgan')
const app = express()
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

morgan.token('body', (request, response) => {
    return JSON.stringify(request.body)   
})



let persons = [
    { 
        name: "Arto Hellas", 
        number: "040-123456",
        id: 1
    },
    { 
        name: "Ada Lovelace", 
        number: "39-44-5323523",
        id: 2
    },
    { 
        name: "Dan Abramov", 
        number: "12-43-234345",
        id: 3
      },
      { 
        name: "Mary Poppendieck", 
        number: "39-23-6423122",
        id: 4
      }
]

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(p => p.id === id)
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.get('/info', (request, response) => {
    const numPersons = persons.length
    response.send(`<p>Phonebook has info for ${numPersons} people</p> <p>${new Date()}</p>`)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(p => p.id !== id)
    response.status(204).end()
})

const getRandomId = (min, max) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min) + min)
}

app.post('/api/persons', (request, response) => {
    const person = request.body
    const sameName = persons.filter(p => p.name === person.name )
    if (!person.name) {
        return response.status(400).json({ error: 'name is missing' })
    }
    if (!person.number) {
        return response.status(400).json({error: 'number is missing'})
    }
    if (sameName.length > 0) {
        return response.status(400).json({error: 'name must be unique'})
    }


    const newPerson = {
        name: person.name,
        number: person.number,
        id: getRandomId(1, 100)
    }

    persons = persons.concat(newPerson)
    response.json(newPerson)
})




const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})