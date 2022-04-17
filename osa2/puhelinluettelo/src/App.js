import { useState, useEffect } from 'react'
import personService from './services/persons'
import Filter from './components/Filter'
import Numbers from './components/Numbers'
import PersonForm from './components/PersonForm'
import './index.css'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPerson => {
        setPersons(initialPerson)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber,
    }

    if (persons.some((person) => person.name === newName)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const person = persons.find(person => person.name === newName)
        const updatedPerson = {
          name: person.name,
          number: newNumber
        }
        const id = person.id
        personService
          .update(id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
            setNewName('')
            setNewNumber('')
            setError(false)
            setMessage(
              `Changed ${returnedPerson.name}`
            )
            setTimeout(() => {
              setMessage(null)
            }, 4000)
          })
          .catch(() => {
            setPersons(persons.filter(n => n.id !== id))
            setError(true)
            setMessage(
              `Information of ${person.name} has already been removed from server`
            )
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
      }
    } else {
      personService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setError(false)
          setMessage(
            `Added ${returnedPerson.name}`
          )
          setTimeout(() => {
            setMessage(null)
          }, 4000)
        })
    }
  }

  const removePerson = (person) => {
    if (window.confirm(`Delete ${person.name}`)) {
      const id = person.id
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id))
          setError(false)
          setMessage(
            `Deleted ${person.name}`
          )
          setTimeout(() => {
            setMessage(null)
          }, 4000)
        })
        .catch(() => {
          setError(true)
          setMessage(
            `Information of ${person.name} has already been removed from server`
          )
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })

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
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} error={error} />
      <Filter filter={filter} handleChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Numbers persons={persons} filter={filter} removePerson={removePerson} />
    </div>
  )
}

export default App;
