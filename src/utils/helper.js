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