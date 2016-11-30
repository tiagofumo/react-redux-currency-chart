import React from 'react'
import ReactHighcharts from 'react-highcharts'
import { SERIES_COLOR } from '../lib/const'

const CurrencyChart = ({ currency, xAxis, series }) => {
  const titleByCurrency = {
    usd: 'Dólar Comercial ($)',
    eur: 'Euro (€)',
    ars: 'Peso Argentino'
  }
  const config = {
    credits: {
      enabled: false
    },
    title: {
      text: titleByCurrency[currency],
      x: -20 //center
    },
    subtitle: {
      text: 'Source: jsonrates.com',
      x: -20
    },
    xAxis: {
      categories: xAxis
    },
    yAxis: {
      title: {
        text: 'Reais (R$)'
      },
      plotLines: [{
        value: 0,
        width: 1,
        color: '#808080'
      }]
    },
    legend: {
      enabled: false,
    },
    tooltip: {
      valuePrefix: 'R$ '
    },
    series: [{
      name: 'Cotação',
      color: SERIES_COLOR,
      data: series
    }]
  }

  return (
    <ReactHighcharts config={ config }></ReactHighcharts>
  )
}

export default CurrencyChart
