import React, { Dispatch, SetStateAction } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { fixMeLater } from '../../utils/types'

type DatePickerProps = {
  startDate?: Date;
  setStartDate?: Dispatch<SetStateAction<DatePickerProps | undefined>>
}

export const CustomDatePicker = ({ startDate, setStartDate }: DatePickerProps) => {
  return (
    <DatePicker selected={startDate} onChange={(date : DatePickerProps) => setStartDate!(date)} />
  )
}
