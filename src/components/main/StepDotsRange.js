import React from 'react'
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';

const StepDotsRange = ({defaultValue ,min ,max ,step,setRange}) => {
  return (
    <div>
    <Slider
    color="blue"
    inverted={false}
    min={min} max={max} step={step}
    dots={true}
    allowCross={false}
    onChange={(e) => {console.log(e)}}
    tooltip={false}
    // onAfterChange={() => dispatch(fetchPage())}
    defaultValue={defaultValue}
    />
    </div>
  )
}

export default StepDotsRange