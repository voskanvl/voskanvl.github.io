import { AnySchema, string } from "yup";

interface personalSchema {
    id: number;
    fieldname: string;
    type:
        | "button"
        | "checkbox"
        | "color"
        | "date"
        | "datetime-local"
        | "email"
        | "file"
        | "hidden"
        | "image"
        | "month"
        | "number"
        | "password"
        | "radio"
        | "range"
        | "reset"
        | "search"
        | "submit"
        | "tel"
        | "text"
        | "time"
        | "url"
        | "week";
    validator: AnySchema;
    placeholder?: string;
}
const personalSchemaForm: personalSchema[] = [
    {
        id: 1,
        fieldname: "name",
        type: "text",
        validator: string().min(2).required("Это поле обязательно для заполнения"),
        placeholder: "Имя",
    },
    {
        id: 2,
        fieldname: "phone",
        type: "tel",
        validator: string().min(10).required("Это поле обязательно для заполнения"),
        placeholder: "Телефон",
    },
];

export default personalSchemaForm;
