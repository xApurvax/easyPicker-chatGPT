import React,{useState} from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { useDispatch } from 'react-redux'

const DualRange = ({defaultValue ,min ,max ,step,setRange}) => {
  const dispatch = useDispatch();
  return (
    <div> 
    <Slider
    color="blue"
    inverted={false}
    min={min} max={max} step={step}
    range
    allowCross={false}
    onChange={(e) => {dispatch(setRange(e))}}
    tooltip={false}
    // onAfterChange={() => dispatch(fetchPage())}
    defaultValue={defaultValue}
  />
  </div>
  )
}

export default DualRange