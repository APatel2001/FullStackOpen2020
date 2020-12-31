const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('The number of parameters you have provided is not sufficent for this program to run!')
  process.exit(1)
}


const password = process.argv[2]
const url = `mongodb+srv://fullstack:${password}@cluster.sia2m.mongodb.net/phonebook-db?retryWrites=true&w=majority`
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
  console.log('phonebook:')
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })
} else if (process.argv.length >= 5) {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4]
  })
  person.save().then(result => {
    console.log(`added${process.argv[3]} number ${process.argv[4]} to phonebook`)
    mongoose.connection.close()
  })
}