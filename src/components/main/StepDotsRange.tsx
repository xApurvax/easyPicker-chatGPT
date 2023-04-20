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
        min={min}
        max={max}
        step={step}
        dots={true}
        allowCross={false}
        onChange={(e) => {}}
        defaultValue={defaultValue}
      />
    </div>
  )
}

export default StepDotsRange
