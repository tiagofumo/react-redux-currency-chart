import moment from 'moment'

export function getLastWeeksDatesAndQuotes(quotesByDate, currency) {
  return Object.keys(quotesByDate).sort().slice(-7)
    .reduce((output, date) => {
      return {
        dates: [ ...output.dates, moment(date, "YYYYMMDD").format('DD/MM') ],
        quotes: [ ...output.quotes, quotesByDate[date][currency] ]
      }
    }, { dates: [], quotes: [] })
}
