import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({onClick, text}) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const Display = ({butn, text}) => {
  return (
    <p>{text} {butn}</p> 
  )
  
   
}


const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodHandle = () => setGood(good + 1)
  const neutralHandle = () => setNeutral(neutral + 1)
  const badHandle = () => setBad(bad + 1)
  

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={goodHandle} text="good"/>
      <Button onClick={neutralHandle} text="neutral"/>
      <Button onClick={badHandle} text="bad"/>
      <h1>statistics</h1>
      <Display text="good" butn={good}/>
      <Display text="neutral" butn={neutral}/>
      <Display text="bad" butn={bad}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)