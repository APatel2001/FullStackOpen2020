import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({onClick, text}) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const Statistic = ({text, value}) => {
  return (
    <tbody align="left">
      <tr>
        <th>{text}</th>
        <th>{value}</th>
      </tr>
    </tbody>
  )
}

const Statistics = ({good, bad, neutral}) => {
  const goodScore = good*1
  const neutralScore = neutral*0
  const badScore = bad*-1
  const total = good+bad+neutral
  const totalScore = goodScore + neutralScore + badScore
  const avg = totalScore/total;
  const perPostitive = (good/total)*100 + " %"
  if (total === 0) {
    return (
      <p>No feedback given</p>
    )
  }
  return (
    <table>
      <Statistic text="good" value={good}/>
      <Statistic text="neutral" value={neutral}/>
      <Statistic text="bad" value={bad}/>
      <Statistic text="all" value={total}/>
      <Statistic text="average" value={avg}/>
      <Statistic text="positive" value={perPostitive}/>
    </table>
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
      <Statistics good={good} bad={bad} neutral={neutral}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)