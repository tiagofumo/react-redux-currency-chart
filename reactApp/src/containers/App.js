import React, { Component } from 'react'
import { connect } from 'react-redux'
import CurrencyChart from '../components/CurrencyChart'
import { ButtonGroup, Grid } from 'react-bootstrap'
import CurrencyButton from '../components/CurrencyButton'
import { getLastWeeksDatesAndQuotes } from '../lib/utils'
import { loadData, setCurrency } from '../actions'

class App extends Component {
  componentDidMount() {
    const { loadData } = this.props
    loadData()
  }

  render() {
    const { isLoading, quotesByDate, currency, setCurrency } = this.props
    const onClickGenerator = (currency) => ( () => setCurrency(currency) )
    let { dates, quotes } = getLastWeeksDatesAndQuotes(quotesByDate, currency)
    return (
      <Grid className='root-grid'>
        <div id='chart-block'>
          <ButtonGroup className='chart-block__currency-selector'>
            <CurrencyButton
              onClick={ onClickGenerator('usd') }
              selected={ currency === 'usd' }>
              Dólar
            </CurrencyButton>
            <CurrencyButton
              onClick={ onClickGenerator('eur') }
              selected={ currency === 'eur' }>
              Euro
            </CurrencyButton>
            <CurrencyButton
              onClick={ onClickGenerator('ars') }
              selected={ currency === 'ars' }>
              Peso Argentino
            </CurrencyButton>
          </ButtonGroup>
          <CurrencyChart
            isLoading={ isLoading }
            currency={ currency }
            xAxis={ dates }
            series={ quotes } />
        </div>
      </Grid>
    )
  }
}

function mapStateToProps(state) {
  return {
    quotesByDate: state.quotesByDate,
    isLoading: state.isLoading,
    currency: state.currency
  }
}

export default connect(mapStateToProps, {
  loadData,
  setCurrency
})(App)
