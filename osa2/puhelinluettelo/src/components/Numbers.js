
const Numbers = ({ persons, filter, removePerson }) => {

  const filtered = persons.filter((person) => person.name.toLowerCase()
    .includes(filter.toLowerCase()))
  return (
    <>
      {filtered.map(person =>
        <p key={person.name}>
          {person.name} {person.number} 
          <button onClick={() => removePerson(person)}>delete</button>
        </p>
      )}
    </>
  )
}


export default Numbers