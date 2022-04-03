import { useState } from 'react'

const Statistics = ({stats}) => {
  if(stats.all == 0) {
    return (
      <div>
        <h1>statistics</h1>
        <h3>No feedback given</h3>
      </div>
    )
  }

  return (
    <div>
      <h1>statistics</h1>
      <table>
        <tbody>
          <StatisticLine text='good' value={stats.good}/>
          <StatisticLine text='neutral' value={stats.neutral}/>
          <StatisticLine text='bad' value={stats.bad}/>
          <StatisticLine text='all' value={stats.all}/>
          <StatisticLine text='avarage' value={stats.avarage}/>
          <StatisticLine text='positive' value={stats.positive}/>
        </tbody>
      </table>
    </div>
  )
}

const StatisticLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td> 
      <td>{value}</td>
    </tr>
  )
} 

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const all = good+bad+neutral
  const avarage = ((good - bad) / all).toFixed(1)
  const positive = ((good/all)*100).toFixed(1) + '%'
  
  const stats = {
    good: good,
    neutral: neutral,
    bad: bad,
    all: all,
    avarage: avarage,
    positive: positive
  }

  const increaseGood = () => setGood(good + 1)
  const increaseNeutral = () => setNeutral(neutral + 1)
  const increaseBad = () => setBad(bad + 1)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={increaseGood} text='good'/>
      <Button handleClick={increaseNeutral} text='neutral'/>
      <Button handleClick={increaseBad} text='bad'/>
      <Statistics stats={stats}/>
    </div>
  )
}

export default App