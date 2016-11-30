import React from 'react'
import { Button } from 'react-bootstrap'

const CurrencyButton = ({ link, children, selected, ...props }) => {
  return(
    <Button
      {...props}
      bsStyle={ selected ? 'primary' : 'default' }>
      { children }
    </Button>
  )
}

export default CurrencyButton
