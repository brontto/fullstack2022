
const Numbers = ({ persons, filter }) => {

  const filtered = persons.filter((person) => person.name.toLowerCase()
    .includes(filter.toLowerCase()))
  return (
    <>
      {filtered.map(person =>
        <p key={person.name}>
          {person.name} {person.number}
        </p>
      )}
    </>
  )
}


export default Numbers