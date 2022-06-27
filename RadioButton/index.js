import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

const RadioButton = ({ input, className, labelClassName, id, children }) => {

  const cnLabel= cn('radio-custom-label ', labelClassName)


  return(
    <Fragment>
      <input
        className={className}
        type="radio"
        id={id}
        {...input}
      />
      <label htmlFor={id} className={cnLabel}>{children}</label>
    </Fragment>

  )

}

RadioButton.propTypes = {
  input: PropTypes.any.isRequired,
  meta: PropTypes.any.isRequired,
  className: PropTypes.string,
  labelClassName: PropTypes.string,
}

export default RadioButton
