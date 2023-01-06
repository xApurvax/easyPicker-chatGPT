import * as Yup from "yup";

export const LoginValidationSchema = Yup.object({
    username: Yup.string()
        .min(3, "Must be 3 char long.")
        .required("Username is required."),
    password: Yup.string()
        .trim()
        .oneOf([Yup.ref("password"), null])
        .min(8, "Must be 8 char long.")
        .required("Password is required."),
});

export const registerValidationSchema = Yup.object({
    username: Yup.string()
        .min(3, "Must be 3 char long.")
        .required("Username is required."),
    password: Yup.string()
        .trim()
        .oneOf([Yup.ref("password"), null])
        .min(8, "Must be 8 char long.")
        .required("Password is required."),
    name: Yup.string()
    .min(3, "Must be 3 char long.")
    .required("Name is required."),
    email: Yup.string().email('Enter valid email').required('E-mail is required'),
});