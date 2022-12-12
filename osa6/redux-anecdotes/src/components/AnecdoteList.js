import { voteAnecdote } from '../reducers/anecdoteReducer'
import { useDispatch, useSelector } from 'react-redux'

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
    const anecdotes = useSelector(state => state)

    const vote = (id) => {
        dispatch(voteAnecdote(id))
    }
    return (
        <div>
            <h2>Anecdotes</h2>
            <ul>
                {anecdotes.map(anecdote =>
                    <Anecdote
                        key={anecdote.id}
                        anecdote={anecdote}
                        handleClick={() => vote(anecdote.id)}
                    />
                )}
            </ul>
        </div>

    )
}

export default AnecdoteList