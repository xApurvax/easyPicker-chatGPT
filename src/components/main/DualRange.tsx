import React from 'react'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../redux/store/store'

interface DualRangeProps {
  defaultValue: number | number[]
  min: number
  max: number
  step: number
  setRange: any
}

const DualRange: React.FC<DualRangeProps> = ({
  defaultValue,
  min,
  max,
  step,
  setRange,
}) => {
  const dispatch = useDispatch<AppDispatch>()
  return (
    <div>
      <Slider
        min={min}
        max={max}
        step={step}
        range
        allowCross={false}
        onChange={(e) => dispatch(setRange(e))}
        defaultValue={defaultValue}
      />
    </div>
  )
}

export default DualRange
