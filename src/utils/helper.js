import Cookies from "js-cookie";

// export const getAccessToken = () => {
//     const token = process.browser
//       ? Cookies.get("token")
//         ? Cookies.get("token")
//         : false
//       : false;
//     return token;
//   };

  export const getAccessToken = () => {
    return Cookies.get("access_token");
  }

  export const generateCaptcha = (length) => {
    var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
        result=""
    for (var i = length; i > 0; --i)
        result += chars[Math.round(Math.random() * (chars.length - 1))]
    return result
}
