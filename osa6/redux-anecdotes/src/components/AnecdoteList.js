import { voteAnecdote } from '../reducers/anecdoteReducer'
import { useDispatch, useSelector } from 'react-redux'
import { clearNotification, setNotification } from '../reducers/notificationReducer'


const Anecdote = ({ anecdote, handleClick }) => {
    return (
        <li>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={handleClick}>vote</button>
            </div>
        </li>
    )
}



const AnecdoteList = (props) => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(({filter, anecdotes}) => {
        if (filter === '') {
            return anecdotes
        }       
        return anecdotes.filter(anecdote => anecdote.content.toString().includes(filter.toString()))
    })
    
    const vote = (anecdote) => {
        dispatch(voteAnecdote(anecdote.id))
        dispatch(setNotification(`you voted '${anecdote.content}'`, 10))
    }

    return (
        <div>
            <h2>Anecdotes</h2>
            <ul>
                {anecdotes
                    .map(anecdote =>
                    <Anecdote
                        key={anecdote.id}
                        anecdote={anecdote}
                        handleClick={() => vote(anecdote)}
                    />
                )}
            </ul>
        </div>

    )
}

export default AnecdoteList