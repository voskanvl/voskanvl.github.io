import { AnySchema, string, date } from "yup";
import phone from "phone";

export type InputTypes =
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

interface personalSchema {
    id: number;
    fieldname: string;
    type: InputTypes;
    validator: AnySchema;
    placeholder?: string;
    value: string;
}
const personalSchemaForm: personalSchema[] = [
    {
        id: 1,
        fieldname: "name",
        type: "text",
        validator: string()
            .min(2, "количество символов должно быть не меньше 2 символов")
            .required("Это поле обязательно для заполнения"),
        placeholder: "Имя",
        value: "",
    },
    {
        id: 2,
        fieldname: "birth",
        type: "date",
        validator: date(),
        value: "",
    },
    {
        id: 3,
        fieldname: "email",
        type: "email",
        validator: string().email("здесь должен быть корректный email").required(),
        placeholder: "Введите email",
        value: "",
    },
    {
        id: 4,
        fieldname: "city",
        type: "text",
        validator: string().test(
            "is-city",
            d => `Не получается найти "${d.value}", как город`,
            async value => {
                if (!value) return false;
                const res = await fetch(
                    `https://nominatim.openstreetmap.org/search?city=${value}&format=json`,
                );
                const data = await res.json();
                console.log("🚀 ~ data", data);
                if (data && data.length) {
                    const countries = data.map((e: { display_name: string }) =>
                        e.display_name.split(",").at(-1),
                    );
                    const faCountries = countries.reduce(
                        (acc: { [key: string]: string }, e: string) => {
                            return acc[e] ? { ...acc, [e]: acc[e] + 1 } : { ...acc, [e]: 1 };
                        },
                        {},
                    );
                    console.log("🚀 ~ faCountries", faCountries);
                    return true;
                }
                return false;
            },
        ),
        placeholder: "Ваш город",
        value: "",
    },
];

export default personalSchemaForm;
