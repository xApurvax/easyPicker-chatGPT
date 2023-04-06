import React from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export const CustomDatePicker = ({ startDate, setStartDate }) => {
  return (
    <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
  )
}
