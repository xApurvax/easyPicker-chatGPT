import React from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { fixMeLater } from '../../utils/types'


export const CustomDatePicker = ({ startDate, setStartDate }: fixMeLater) => {
  return (
    <DatePicker selected={startDate} onChange={(date : object) => setStartDate(date)} />
  )
}
