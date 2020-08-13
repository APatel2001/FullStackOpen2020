import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => {
  return (
    <button onClick={props.action}>{props.text}</button>
  )
  
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array.apply(null, new Array(anecdotes.length)).map(Number.prototype.valueOf,0))
  const addPoints = () => {
    const copy = [...points]
    copy[selected] +=1
    setPoints(copy)
  }

  const maxValue = Math.max(...points)
  const maxIndex = points.indexOf(maxValue)
  
  
  const Selector = () => setSelected(Math.floor(Math.random() * props.anecdotes.length))
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <div>{props.anecdotes[selected]} has {points[selected]} votes</div>
      <Button action={addPoints} text="vote"/>
      <Button action={Selector} text="next anecdote"/>
      <h1>Anecdote with the most votes</h1>
      <p>{props.anecdotes[maxIndex]} has {maxValue} votes</p>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)