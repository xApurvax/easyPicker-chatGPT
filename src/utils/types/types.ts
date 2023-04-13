export type Nullable<T> = T | null
export type fixMeLater = any

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
  email: string
}

export type ForgotOtpVerifyApiPayload = {
  email: string
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
