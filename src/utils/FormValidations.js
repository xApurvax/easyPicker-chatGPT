import * as Yup from "yup";

export const LoginValidationSchema = Yup.object({
    username: Yup.string()
        .min(3, "Must be 3 char long.")
        .required("E-mail or username is required.").trim(),
    password: Yup.string()
        .trim()
        .oneOf([Yup.ref("password"), null])
        .min(8, "Must be 8 char long.")
        .required("Password is required."),
});

export const registerValidationSchema = Yup.object({
    username: Yup.string()
        .min(3, "Must be 3 char long.")
        .required("Username is required.").trim(),
    password: Yup.string()
        .trim()
        .oneOf([Yup.ref("password"), null])
        .min(8, "Must be 8 char long.")
        .required("Password is required."),
    name: Yup.string()
    .min(3, "Must be 3 char long.")
    .required("Name is required.").trim(),
    email: Yup.string().email('Enter valid e-mail.').required('E-mail is required.'),
});

export const profileUpdateValidationSchema = Yup.object({
    username: Yup.string()
        .min(3, "Must be 3 char long.")
        .required("Username is required.").trim(),
    name: Yup.string()
    .min(3, "Must be 3 char long.")
    .required("Name is required.").trim(),
    email: Yup.string().email('Enter valid e-mail.').required('E-mail is required.'),
});

export const contactUsValidationSchema = Yup.object({
    message: Yup.string()
        .min(3, "Must be 3 char long.")
        .required("Message is required.").trim(),
    name: Yup.string()
    .min(3, "Must be 3 char long.")
    .required("Name is required.").trim(),
    email: Yup.string().email('Enter valid e-mail.').required('E-mail is required.'),
    recaptcha: Yup.string().required('Please verify recaptcha.'),
});

export const contactUsValidationWithoutCaptchaSchema = Yup.object({
    message: Yup.string()
        .min(3, "Must be 3 char long.")
        .required("Message is required.").trim(),
    name: Yup.string()
    .min(3, "Must be 3 char long.")
    .required("Name is required.").trim(),
    email: Yup.string().email('Enter valid e-mail.').required('E-mail is required.'),
    recaptcha: Yup.string().required('Please verify recaptcha.'),
});

export const forgotPasswordValidationSchema = Yup.object({
    email: Yup.string().email('Enter valid e-mail.').required('E-mail is required.'),
});

export const ResetPasswordValidationSchema = Yup.object({
    password: Yup.string().required('Password is required.')
        .trim()
        .oneOf([Yup.ref("password"), null])
        .min(8, "Must be 8 char long.")
        .required("Password is required.")
    ,
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match.')
        .trim()
        .min(8, "Must be 8 char long.")
        .required("Password is required."),
});