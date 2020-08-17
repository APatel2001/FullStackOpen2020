import React, { useState } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'


const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456', key: 1 },
        { name: 'Ada Lovelace', number: '39-44-5323523', key: 2 },
        { name: 'Dan Abramov', number: '12-43-234345', key: 3 },
        { name: 'Mary Poppendieck', number: '39-23-6423122', key: 4 }
    ])
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber] = useState('')
    const [search, changeSearch] = useState('')

    const nameSame = persons.filter(item => item.name === newName)
    const nameSearch = persons.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    const addName = (event) => {
        event.preventDefault()
        const newObject = {
            name: newName,
            key: persons.length +1,
            number: newNumber
        }
        if (nameSame.length === 0) {
            setPersons(persons.concat(newObject))
        }
        else {
            window.alert(`${newName} is already added to phonebook`);
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
    

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter search={search} searchFunction={searchHandler} />
            <h2>Add New</h2>
            <PersonForm entryFunction={addName} name={newName} nameFunction={nameHandler} number={newNumber} numberFunction={numberHandler}/>
            <h2>Numbers</h2>
            <Persons search={search} original={persons} searched={nameSearch}/>
        </div>
    )
}

export default App