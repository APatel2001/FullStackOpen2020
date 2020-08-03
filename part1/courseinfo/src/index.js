import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return (
    <div>
      <h1>{props.c}</h1>
    </div>
  )
  
  
}

const Part = (props) => {
  return (
    <p>{props.part} {props.exersize}</p>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part part = {props.part1} exersize = {props.e1}/>
      <Part part = {props.part2} exersize = {props.e2}/>
      <Part part = {props.part3} exersize = {props.e3}/>
    </div>
  )
}

const Total = (props) => {
  return (
    <div>
      <p>Number of exercises {props.e1 + props.e2 + props.e3}</p>
    </div>
  )
}



const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header c = {course}/>
      <Content e1 = {exercises1} e2 = {exercises2} e3 = {exercises3} part1 = {part1} part2 = {part2} part3 = {part3} />
      <Total e1 = {exercises1} e2 = {exercises2} e3 = {exercises3} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))