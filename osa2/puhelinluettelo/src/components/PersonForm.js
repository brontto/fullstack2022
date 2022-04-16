const PersonForm = (props) => {
    return (
        <form onSubmit={props.addPerson}>
            <FormPart text={'name:'} newValue={props.newName} handleChange={props.handleNameChange} />
            <FormPart text={'number:'} newValue={props.newNumber} handleChange={props.handleNumberChange} />
            <div>
                <button type='submit'>add</button>
            </div>
        </form>
    )
}

const FormPart = ({ text, newValue, handleChange }) => {
    return (
        <div>
            {text} <input
                value={newValue}
                onChange={handleChange}
            />
        </div>
    )
}

export default PersonForm