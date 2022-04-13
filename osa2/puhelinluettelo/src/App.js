import { useState,useEffect } from 'react'
import axios from 'axios'


const Numbers = ({ filtered }) => {
  return (
    <>
      {filtered.map(person => <p key={person.name}>{person.name} {person.number}</p>)}
    </>
  )
}

const Filter = ({ filter, handleChange }) => {
  return (
    <div>
      filter shown with: <input
        value={filter}
        onChange={handleChange}
      />
    </div>
  )
}

const PersonForm = (props) => {
  return(
    <form onSubmit={props.addPerson}>
        <FormPart text={'name:'} newValue={props.newName} handleChange={props.handleNameChange}/>
        <FormPart text={'number:'} newValue={props.newNumber} handleChange={props.handleNumberChange}/>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
  )
} 

const FormPart = ({text, newValue, handleChange}) => {
  return (
    <div>
      {text} <input 
        value={newValue}
        onChange={handleChange}
      />
    </div>
  )
}


const App = () => {
  const [persons, setPersons] = useState([])
  const [filtered, setFiltered] = useState([...persons])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const hook = () => {
    axios
    .get('http://localhost:3001/persons')
    .then(response => {
      setPersons(response.data)
      setFiltered(response.data)
    })
  }

  useEffect(hook, [])


  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber,
    }

    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat(newPerson))
      setFilter('')
      setFiltered(filtered.concat(newPerson))
      setNewName('')
      setNewNumber('')
    }
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
    setFiltered(persons.filter((person) => person.name.toLowerCase().includes(event.target.value.toLowerCase())))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleChange={handleFilterChange}/>
      <h2>add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Numbers filtered={filtered} />
    </div>
  )
}

export default App;
