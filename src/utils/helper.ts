import Cookies from 'js-cookie'

export const getAccessToken = () => {
  return Cookies.get('access_token')
}

export const generateCaptcha = (length: number) => {
  var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
    result = ''
  for (var i = length; i > 0; --i)
    result += chars[Math.round(Math.random() * (chars.length - 1))]
  return result
}

export const twoDigits = (num: number) => String(num).padStart(2, '0')

export const dateFormatter = (date: string) => {
  let objectDate = new Date(date)

  const formattedDate =
    String(objectDate.getDate()).padStart(2, '0') +
    '/' +
    String(objectDate.getMonth() + 1).padStart(2, '0') +
    '/' +
    String(objectDate.getFullYear())

  return formattedDate
}
