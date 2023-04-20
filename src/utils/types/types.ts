import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit'
import {
  ButtonHTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
  TextareaHTMLAttributes,
} from 'react'
import { FieldHookConfig } from 'formik'
import { RootState } from '../../redux/store/store'

export type ErrorResponseType = {
  response: {
    data?: { message: string }
  }
  message?: string
}

type Result = any

export type ApiResponse = {
  message: string
  result: Result[]
  status: boolean
  status_code: number
}

export type ForgotPasswordFetchPayload = {
  email: Nullable<string>
}

export type ForgotOtpVerifyApiPayload = {
  email: Nullable<string>
  otp: string
}

export type PasswordResetPayload = {
  email: string
  password: string
}

export type ErrorResponse = {
  response?: {
    data: {
      message: string
    }
  }
  message?: string
}

export type ContactUsPayload = {
  name: string
  email: string
  message: string
  captcha: string
}

export type GenerateHeadingPayload = {
  heading_type: Nullable<string>
  paragraph: Nullable<string>
  num_headers: Nullable<number>
  language?: Nullable<string>
}

export type SaveResultPayload = {
  heading_type: string
  paragraph: string
  num_headers: number
  tag: string
  title: string
  language: string
}

export type fixMeLater = any

export type UserPictureProps = {
  file?: File
  url?: string
}
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  buttonStyle?: string
  children?: ReactNode
  loaderSize?: number
  showLoader?: boolean
}

export type SVGComponent = React.FunctionComponent<
  React.SVGProps<SVGSVGElement>
>

export type otherProps = {
  props?: FieldHookConfig<string>
}

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  inputstyle?: string
  placeholder?: string
  borderstyle?: string
  errorRight?: string
  iconAfter?: SVGComponent
  iconBefore?: SVGComponent
  lable?: string
  props?: otherProps | string
  name: string
}

export interface TextAreaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  inputstyle?: string
  placeholder?: string
  borderstyle?: string
  errorRight?: string
  iconAfter?: SVGComponent
  iconBefore?: SVGComponent
  lable?: string
  props?: otherProps | string
  name: string
}

export type AppThunkDispatch = ThunkDispatch<RootState, any, AnyAction>

export type Nullable<T> = T | null
