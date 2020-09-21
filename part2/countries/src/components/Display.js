import React from 'react'



const Form = ({item, setButtonBool, setButtonVal}) => {
    const submitFunction = (event) => {
        event.preventDefault()
        setButtonBool(true)
        setButtonVal(item)
        
    }
    return (
        <div>
            <form onSubmit={submitFunction} key={item.alpha3Code}>
                {item.name}<button type="submit">show</button>
            </form>
        </div>
    )
}

const LessThanTen = ({searchedList, setButtonBool, setButtonVal}) => {
    
    return (
        <div>
            {searchedList.map(item =>   
                <Form item={item} key={item.alpha3Code} setButtonBool={setButtonBool} setButtonVal={setButtonVal}/>
            )}
        </div>
    )
}

const TooMany = () => {
    return (
      <div>
        Too many matches, specify filter 
      </div>    
    )
  }


  const One = ({searchedList}) => {
    const city = searchedList[0]?.capital
    return (
      <div>
        <h1>{searchedList[0]?.name}</h1>
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
        <h1>Weather in {city}</h1>
        <Weather city={city} />
      </div>
    )
  }


  
  const Display = ({searchedList, setButtonBool, setButtonVal, buttonBool, buttonVal}) => {
    const resetHandler = (event) => {
        event.preventDefault()
        setButtonBool(false)
    }
    if (searchedList.length > 10) {
      return <TooMany/>
    }

    else if (searchedList.length <= 10 && searchedList.length > 1) {
        if (buttonBool) {
            return (
                <div>
                    <form onSubmit={resetHandler}>
                        <button type="submit">reset</button>
                    </form>
                    <One searchedList={[buttonVal]}/>
                </div>
            )
        }
        return <LessThanTen searchedList={searchedList} setButtonBool={setButtonBool} setButtonVal={setButtonVal}/>
    }
    
    else {
      return <One searchedList={searchedList}/>
    }
  }
  
  
  export default Display