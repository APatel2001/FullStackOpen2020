import React from 'react'

const TooMany = () => {
    return (
      <div>
        Too many matches, specify filter 
      </div>    
    )
  }


  const FormElement = ({item}) => {
    const submitFunction = (event) => {
        event.preventDefault()
    }
    return (
        <form onSubmit={submitFunction}>
            {item.name}<button type="submit">show</button>
        </form>
      )
  }


  const LessThanTen = ({searchedList}) => {
    
    return (
      <div>
        {searchedList.map(item => <FormElement item={item} key={item.alpha3Code}/>)}
      </div>
    )
  }



  const One = ({searchedList}) => {
    return (
      <div>
        {searchedList.map(item => <h1 key={item.alpha3Code}>{item.name}</h1>)}
        {searchedList.map(item => <p key={item.alpha3Code}>capital {item.capital}</p>)}
        {searchedList.map(item => <p key={item.alpha3Code}>capital {item.population}</p>)}
        <h3>languages</h3>
        {searchedList.map(item => 
          <ul key={item.alpha3Code}>
            {item.languages.map(singItem => 
              <li key={singItem.iso639_2}>{singItem.name}</li>
            )}
          </ul>
        )}
        {searchedList.map(item => <img src={item.flag} alt="flag" key={item.alpha3Code}/>)}
      </div>
    )
  }


  
  const Display = ({searchedList}) => {
    if (searchedList.length > 10) {
      return <TooMany/>
    }
    else if (searchedList.length <= 10 && searchedList.length > 1) {
      return <LessThanTen searchedList={searchedList}/>
    }
    else {
      return <One searchedList={searchedList}/>
    }
  }
  
  export default Display