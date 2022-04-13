import Weather from './Weather'


const Countries = ({ countries, filter, setFilter }) => {
  const filtered = countries.filter((country) => {
    return country.name.common.toLowerCase().includes(filter.toLowerCase())
  })

  if (filtered.length > 10) {
    return (
      <p>Too many matches, specify another filter</p>
    )
  } else if (filtered.length === 1) {
    return (
      <DetailedCountry country={filtered[0]} />
    )
  } else {
    return (
      <CountryList countries={filtered} setFilter={setFilter}/>
    )
  }
}

const CountryList = ({ countries, setFilter }) => {
  return (
    <div>
      {countries.map((country) =>
        <Country key={country.name.common} country={country} setFilter={setFilter}/>
      )}
    </div>
  )
}

const Country = ({ country, setFilter}) => {
  return (
    <div>
    {country.name.common}
    <button onClick={() => setFilter(country.name.common)}>show</button>
    </div>
  )
}

const DetailedCountry = ({ country }) => {
  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>capital {country.capital}</p>
      <p>area: {country.area}</p>
      <h3>languages:</h3>
      <Languages country={country} />
      <Flag link={country.flags.png}/>
      <Weather city={'London'} />
    </div>
  )
}

const Flag = ({link}) =>{
  return(
    <div>
      <img src={link} alt='flag'/>
    </div>
  )
}

const Languages = ({ country }) => {
  const keys = Object.keys(country.languages)
  return (
    <ul>{
      keys.map(language => {
        return <li key={language}>{country.languages[language]}</li>
      })}
    </ul>
  )
}



export default Countries