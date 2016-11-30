import * as api from './lib/api'
import { CURRENCIES } from './lib/const'
import moment from 'moment'

export function loadData() {
  return (dispatch, getState) => {
    dispatch({
      type: 'START_LOADING'
    })
    api.fetchQuotesByDate().then((data) => {
      dispatch({
        type: 'SET_QUOTES_BY_DATE',
        quotes: data
      })
      dispatch({
        type: 'STOP_LOADING'
      })
    })
  }
}

export function setCurrency(currency) {
  return {
    type: 'SET_CURRENCY',
    currency
  }
}
