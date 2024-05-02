import * as yup from 'yup';

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{5,}$/;

export const basicSchema = yup.object().shape({
    name: yup.string().required("Required"),
    email: yup.string().email("Please enter a valid email Id").required("Required"),
    age: yup.number().positive().integer().required("Required"),
    password: yup.string().min(5).matches(passwordRules, { message: "Please create a stronger password" }).required("Required"),
    confirmPassword: yup.string().oneOf([yup.ref("password"), null], "Password must match").required("Required"),
    image: yup.mixed()
        .test('FILE_SIZE', 'Too Big!', value => {
            if (value) {
                return value.size <= 1024 * 1024;
            }
            return true;
        })
        .test('FILE_TYPE', 'Invalid', value => {
            if (value) {
                const supportedFormats = ['jpeg', 'jpg', 'png', 'svg', 'gif'];
                return supportedFormats.includes(value.name.split('.').pop());
            }
            return true;
        })

});

export const editSchema = yup.object().shape({
    name: yup.string().required("Required"),
    email: yup.string().email("Please enter a valid email Id").required("Required"),
    age: yup.number().positive().integer().required("Required"),
    
});

