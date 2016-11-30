import { combineReducers } from 'redux'

function quotesByDate(state = {}, action) {
  switch (action.type) {
    case 'SET_QUOTES_BY_DATE':
      return action.quotes
    default:
      return state
  }
}

function isLoading(state = false, action) {
  switch (action.type) {
    case 'START_LOADING':
      return true
    case 'STOP_LOADING':
      return false
    default:
      return state
  }
}

function currency(state = 'usd', action) {
  switch (action.type) {
    case 'SET_CURRENCY':
      return action.currency
    default:
      return state
  }
}

export default combineReducers({
  quotesByDate,
  isLoading,
  currency
})
