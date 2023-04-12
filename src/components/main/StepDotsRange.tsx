import React from 'react'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
interface StepDotsRangeProps {
  defaultValue: number | number[]
  min: number
  max: number
  step: number
}
const StepDotsRange: React.FC<StepDotsRangeProps> = ({
  defaultValue,
  min,
  max,
  step,
}) => {
  return (
    <div>
      <Slider
        // color="blue"
        // inverted={false}
        min={min}
        max={max}
        step={step}
        dots={true}
        allowCross={false}
        onChange={(e) => {}}
        // tooltip={false}
        // onAfterChange={() => dispatch(fetchPage())}
        defaultValue={defaultValue}
      />
    </div>
  )
}

export default StepDotsRange
