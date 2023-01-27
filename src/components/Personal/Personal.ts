import { AnySchema, string, date } from "yup";
import phone from "phone";
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
        validator: string()
            .min(2, "количество символов должно быть не меньше 2 символов")
            .required("Это поле обязательно для заполнения"),
        placeholder: "Имя",
    },
    {
        id: 2,
        fieldname: "birth",
        type: "date",
        validator: date(),
    },
    {
        id: 3,
        fieldname: "email",
        type: "email",
        validator: string().email("здесь должен быть корректный email").required(),
        placeholder: "Введите email",
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
    },
];

export default personalSchemaForm;
