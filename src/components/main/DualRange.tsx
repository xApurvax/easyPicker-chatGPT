import React from 'react'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import { useDispatch } from 'react-redux'
import { fixMeLater } from '../../utils/types'

interface DualRangeProps {
  defaultValue: number | number[]
  min: number
  max: number
  step: number
  setRange: fixMeLater
}

const DualRange: React.FC<DualRangeProps> = ({
  defaultValue,
  min,
  max,
  step,
  setRange,
}) => {
  const dispatch = useDispatch()
  return (
    <div>
      <Slider
        // color="blue"
        // inverted={false}
        min={min}
        max={max}
        step={step}
        range
        allowCross={false}
        onChange={(e) => dispatch(setRange(e))}
        // tooltip={false}
        defaultValue={defaultValue}
      />
    </div>
  )
}

export default DualRange
