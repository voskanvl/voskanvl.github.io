import * as yup from "yup";
import YupPassword from "yup-password";
YupPassword(yup);

interface passwordSchema {
    id: number;
    fieldname: string;
    validator: yup.AnySchema;
}
const passwordSchemaForm: passwordSchema[] = [
    {
        id: 1,
        fieldname: "password",
        validator: yup
            .string()
            .password()
            .min(6, "количество символов должно быть не меньше 6 символов")
            .minLowercase(1, "пароль должен содержать минимум одну прописную букву")
            .minUppercase(1, "пароль должен содержать минимум одну заглавную букву")
            .minNumbers(1, "пароль должен содержать не менее одной цифры")
            .minSymbols(1, "пароль должен содержать не менее одного символа (!@#$%^ ... итд)")
            .required("Это поле обязательно для заполнения"),
    },
    {
        id: 2,
        fieldname: "password-to-check",
        validator: yup.string().required("повторите введенный пароль"),
    },
];

export default passwordSchemaForm;
