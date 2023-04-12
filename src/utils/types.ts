import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit"
import { RootState } from "../redux/store/store"
import { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from "react"
import { FieldHookConfig } from "formik"

export type fixMeLater = any

export type LoginProps = {
    username: string
    password: string
}

export type SignupProps = {
    username: string
    password: string
    name: string
    email: string
}

export type UserProfileProps = {
    username: string
    name: string
    email: string
}

export type UserPictureProps = {
    file?: File
    url?: string
}

export type ForgotProps = {
    email: string
}

export type PasswordResetProps = {
    confirmPassword: string
    password: string
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    buttonStyle?: string;
    children?: ReactNode;
    loaderSize?: number;
    showLoader?: boolean;
}

export type SVGComponent = React.FunctionComponent<React.SVGProps<SVGSVGElement>>

export type otherProps = {
  props?: FieldHookConfig<string>
}

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  inputstyle?: string;
  placeholder?: string;
  borderstyle?: string;
  errorRight?: string;
  iconAfter?: SVGComponent;
  iconBefore?: SVGComponent;
  lable?: string;
  props?: otherProps | string;
  name: string;
}

export interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    inputstyle?: string;
    placeholder?: string;
    borderstyle?: string;
    errorRight?: string;
    iconAfter?: SVGComponent;
    iconBefore?: SVGComponent;
    lable?: string;
    props?: otherProps | string;
    name: string;
}

export type AppThunkDispatch = ThunkDispatch<RootState, any, AnyAction>;