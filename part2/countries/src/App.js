import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Display from './components/Display.js'

const App = () => {
    const [countries, setCountries] = useState([])
    const [search, setSearch] = useState('')
    const [buttonBool, setButtonBool] = useState(false)
    const [buttonVal, setButtonVal] = useState('')
    useEffect(() => {
      axios
        .get('https://restcountries.eu/rest/v2/all')
        .then(response => {
          setCountries(response.data)
        })
    })
    const searchHandler = (event) => {
      setSearch(event.target.value)
    }
    const searcher = countries.filter(items => items.name.toLowerCase().includes(search.toLowerCase()))
    return (
      <div>
        <div>
            find countries <input value={search} onChange={searchHandler}/>
        </div>
            <Display searchedList={searcher} setButtonBool={setButtonBool} setButtonVal={setButtonVal} buttonBool={buttonBool} buttonVal={buttonVal}/>
      </div>
    )
  }

  export default App