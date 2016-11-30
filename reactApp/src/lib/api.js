const API_QUOTES_PATH = 'quotes_by_date.json'

export function fetchQuotesByDate() {
  return fetch(`${API_QUOTES_PATH}`).then((response) => response.json())
}
