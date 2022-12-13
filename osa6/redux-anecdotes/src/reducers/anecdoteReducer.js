import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdoteService'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    changeVotedAnecdote(state, action) {
      const id = action.payload
      const anecdoteToVote = state.find(n => n.id === id)

      const changedAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1
      }

      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : changedAnecdote)
        .sort((a, b) => b.votes - a.votes)
    },
    setAnecdotes(state, action){
      return action.payload
    },
    appendAnecdotes(state, action){
      state.push(action.payload)
    }
  }
})

export const { changeVotedAnecdote, setAnecdotes, appendAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdotes(newAnecdote))
  }
}

export const voteAnecdote = id => {
  return async dispatch => {
    await anecdoteService.voteAnecdote(id)
    dispatch(changeVotedAnecdote(id))
  }
}

export default anecdoteSlice.reducer
