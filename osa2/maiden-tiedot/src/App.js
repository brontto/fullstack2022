import { useEffect, useState } from 'react'
import axios from 'axios'
import Countries from './components/Countries'


const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')


  const hook = () => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }

  useEffect(hook, [])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <h2>maiden tiedot</h2>
      <div>
        find countries
        <input
          value={filter}
          onChange={handleFilterChange}
        />
      </div>
      <div>
        <Countries countries={countries} filter={filter} setFilter={setFilter} />
      </div>
    </div>
  );
}

export default App;
