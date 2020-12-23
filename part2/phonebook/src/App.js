import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import backend from './services/backend'


const App = () => {
    const [persons, setPersons] = useState([])
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber] = useState('')
    const [requestData, setRequestData] = useState(new Date()); 
    const [search, changeSearch] = useState('')
    useEffect(() => {
        backend
            .gettAll()
            .then(response => setPersons(response))
      }, [requestData])

    const nameSame = persons.filter(item => item.name === newName)
    const nameSearch = persons.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    const addName = (event) => {
        event.preventDefault()
        const numberSame = persons.filter(item => item.number === newNumber)
        if (nameSame.length === 0) {
            const newObject = {
                name: newName,
                number: newNumber
            }
            backend
                .addItem(newObject)
                .then(response => {
                    setPersons(persons.concat(response))
                    setNewName('')
                    setNewNumber('')
                })
        } else if (nameSame.length !== 0 && numberSame.length === 0) {
            const item = persons.find(person => person.name === newName)
            const changedItem = {...item, number: newNumber}
            backend
                .updateItem(item.id, changedItem)
                .then(response => {
                    
                    setPersons(persons.map(i => i.id !== item.id ? i : response))
                })
        } else if (nameSame.length !== 0 && numberSame.length !== 0) {
            console.log(persons)
            window.alert(`${newName} is already added to phonebook, replace the old number with a new one?`);
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
        backend.deleteItem(id).then(() => {
            setRequestData(new Date())
            setPersons(persons.map(item => item))
        })
    }

    
    

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter search={search} searchFunction={searchHandler} />
            <h2>Add New</h2>
            <PersonForm entryFunction={addName} name={newName} nameFunction={nameHandler} number={newNumber} numberFunction={numberHandler}/>
            <h2>Numbers</h2>
            <Persons search={search} original={persons} searched={nameSearch} Delete={Delete}/>
        </div>
    )
}

export default App