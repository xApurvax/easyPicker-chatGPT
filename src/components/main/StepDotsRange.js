import React from 'react'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'

const StepDotsRange = ({ defaultValue, min, max, step, setRange }) => {
  return (
    <div>
      <Slider
        color="blue"
        inverted={false}
        min={min}
        max={max}
        step={step}
        dots={true}
        allowCross={false}
        onChange={(e) => {}}
        tooltip={false}
        // onAfterChange={() => dispatch(fetchPage())}
        defaultValue={defaultValue}
      />
    </div>
  )
}

export default StepDotsRange
