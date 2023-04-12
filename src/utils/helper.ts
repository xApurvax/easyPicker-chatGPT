import Cookies from 'js-cookie'
// import { useEffect } from "react";
// import { useSelector } from "react-redux";
// import { setMinute, setSecond } from "../redux/slices/otpTimerSlice";

// const {minute,second } = useSelector((state) => ({
//   minute: state.generateHeadlineSlice.minute,
//   second: state.forgotPasswordSlice.second,
// }));

// export const getAccessToken = () => {
//     const token = process.browser
//       ? Cookies.get("token")
//         ? Cookies.get("token")
//         : false
//       : false;
//     return token;
//   };

export const getAccessToken = () => {
  return Cookies.get('access_token')
}

export const generateCaptcha = (length : number) => {
  var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
    result = ''
  for (var i = length; i > 0; --i)
    result += chars[Math.round(Math.random() * (chars.length - 1))]
  return result
}

export const twoDigits = (num : number) => String(num).padStart(2, '0')

export const dateFormatter = (date : string) => {
  let objectDate = new Date(date)

  const formattedDate =
    String(objectDate.getDate()).padStart(2, '0') +
    '/' +
    String(objectDate.getMonth() + 1).padStart(2, '0') +
    '/' +
    String(objectDate.getFullYear())

  return formattedDate
}
