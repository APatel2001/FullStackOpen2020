import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import backend from './services/backend'
import Notification from './components/notification'



const App = () => {
    const [persons, setPersons] = useState([])
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber] = useState('')
    const [search, changeSearch] = useState('')
    const [errorMessage, setErrorMesage] = useState(null)
    const [addedMessage, setAddedMessage] = useState(null)


    useEffect(() => {
        backend
            .gettAll()
            .then(response => setPersons(response))
      }, [])

    const nameSame = persons.filter(item => item.name === newName)
    const nameSearch = persons.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    const addName = (event) => {
        event.preventDefault()
        const nameSearch = persons.find(item => item.name === newName)
        const numSearch = persons.find(item => (item.number === newNumber && item.name === newName))
        console.log("NAME:", nameSearch)
        console.log("NAME:", !nameSearch)

        if (!nameSearch && !numSearch) {
            console.log("GOT HERE")
            const newObject = {
                name: newName,
                number: newNumber
            }
            backend
                .addItem(newObject)
                .then(response => {
                    setPersons(persons.concat(response))
                    setAddedMessage(`Added ${newName}`)
                    setTimeout(() => {setAddedMessage(null)}, 5000)
                    setNewName('')
                    setNewNumber('')
                })
                
                .catch(error => {
                    setErrorMesage(error.response.data.error)
                    setTimeout(() => {setErrorMesage(null)}, 5000)
                    
                })
        } else if (nameSearch && !numSearch) {
            console.log("GOT HERE")
            const item = persons.find(person => person.name === newName)
            const changedItem = {...item, number: newNumber}
            backend
                .updateItem(item.id, changedItem)
                .then(response => {
                    setPersons(persons.map(i => i.id !== item.id ? i : response))
                    setAddedMessage(`Changed ${newName}'s Phone Number`)
                    setTimeout(() => {setAddedMessage(null)}, 5000)
                })
                .catch(error => {
                    setErrorMesage(error.response.data.error)
                    setTimeout(() => {setErrorMesage(null)}, 5000)
                })
        } else if (nameSearch && numSearch) {
            console.log("GOT HERE")
            console.log(persons)
            setErrorMesage(`${newName} is already added to phonebook, replace the old number with a new one?`)
            setTimeout(() => {setErrorMesage(null)}, 5000)
        }
    
    }

    
    const nameHandler = (event) => {
        setNewName(event.target.value)
    }
    const numberHandler = (event) => {
        setNewNumber(event.target.value)
    }
    const searchHandler = (event) => {
        changeSearch(event.target.value)
    }

    const Delete = (id) => {
        const deleted = persons.find(item => item.id === id)
        backend.deleteItem(id).then(() => {
            setPersons(persons.filter(item => item.id !== id))
        })
        .catch(error => {
            setErrorMesage(`${deleted.name} was already removed from the server`)
            setPersons(persons.filter(item => item.id !== id))
            setTimeout(() => {setErrorMesage(null)}, 5000)
        })
    }
    
    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={addedMessage} color={"green"}/>
            <Notification message={errorMessage} color={"red"}/>
            <Filter search={search} searchFunction={searchHandler} />
            <h2>Add New</h2>
            <PersonForm entryFunction={addName} name={newName} nameFunction={nameHandler} number={newNumber} numberFunction={numberHandler}/>
            <h2>Numbers</h2>
            <Persons search={search} original={persons} searched={nameSearch} Delete={Delete}/>
        </div>
    )
}

export default App