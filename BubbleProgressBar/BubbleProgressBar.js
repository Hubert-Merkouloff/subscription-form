import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'



const BubbleProgressBar = ({ numberOfSteps, currentStep }) => {

  const renderCircle = (active, index) => {
    const bubbleClassName = cn('circles', { active: active })

    return(
      <div id={index} className={bubbleClassName}></div>
    )
  }

  const renderCircles = (currentStep, numberOfSteps) => {
    const circlesArray = [...Array(numberOfSteps)].map((element, index) => renderCircle((index < currentStep+1), index))

    return (
      circlesArray
    )
  }

  return(
    <Fragment>
      <div className="bubbleProgressBar">
        <div className="progress-container">
          <div className="progress" id="progress"></div>
          {renderCircles(currentStep,numberOfSteps)}
        </div>
      </div>
    </Fragment>
  )

}

BubbleProgressBar.defaultProps = {
  numberOfSteps: 2,
  currentStep: 0,
}

BubbleProgressBar.propTypes = {
  numberOfSteps: PropTypes.number,
  currentStep: PropTypes.number,
}

export default BubbleProgressBar
