<template>
    <form class="personal" ref="formEl">
        <n-field
            v-for="p in Personal"
            :placeholder="p.placeholder"
            :fieldname="p.fieldname"
            :name="p.fieldname"
            :validator="p.validator"
            :type="p.type"
            :key="p.id"
            :value="p.value"
        />
        <div class="phone-field">
            <select
                name="country"
                class="phone-field__country"
                v-model="countryValue"
                @change="changeSelect"
            >
                <option
                    v-for="country in countryList"
                    :value="country.code"
                    :key="country.code"
                    :selected="countryValue === country.country"
                >
                    {{ country.country }}
                </option>
            </select>
            <input name="phone" class="phone-field__phone" v-mask v-model="phone" />
            <span :class="{ 'field__error': true, 'field__error--deactive': !!errorMessage }">{{
                errorMessage
            }}</span>
        </div>
        <input type="submit" value="Отправить" @click.prevent="save" />
    </form>
</template>

<script setup lang="ts">
    import { onMounted, ref, reactive, Ref } from "vue";
    import NField from "../NField.vue";
    import * as yup from "yup";
    import "yup-phone";
    import Personal from "./Personal";
    import countryList from "../../../countryCode.js";
    import IMask from "imask";
    import { useField, useForm } from "vee-validate";
    import personalSchemaForm from "./Personal";

    const formEl = ref<HTMLFormElement | null>(null);

    onMounted(() => {
        const data = localStorage.getItem("personal");
        if (!data) return;
        const dataParsed = JSON.parse(data);
        Personal.forEach(e => {
            !!dataParsed[e.fieldname] && (e.value = dataParsed![e.fieldname]);
        });
    });

    // const phone = ref("");
    const countryValue = ref("+7");
    const mask: Ref<IMask.InputMask<any> | null> = ref(null);

    const vMask = {
        mounted(el: HTMLInputElement) {
            mask.value = IMask(el, {
                mask: `{${countryValue.value}}(000)000-00-00`,
                lazy: false,
            });
        },
    };

    const changeSelect = (event: Event) => {
        mask.value?.updateOptions({
            mask: `{${(event.target! as HTMLSelectElement).value}}(000)000-00-00`,
        });
        console.log("🚀 ~ mask.value", mask.value);
        const matchPhone = phone.value.match(/\+\d+(\(.*)/);
        const withoutCode = !!matchPhone && matchPhone.length > 1 ? matchPhone[1] : "";
        console.log("withoutCode", withoutCode);
        phone.value = `${countryValue.value}${withoutCode}`;
        mask.value?.updateValue();
    };

    const { value: phone, errorMessage } = useField(
        "phone",
        yup
            .string()
            .test(
                "phone-test",
                "Номер телефона - обязательное поле",
                val => !!val && !val?.includes("_"),
            ),
        // props.validator as RuleExpression<unknown>,
    );

    type FormFields = {
        name: string;
        birth: string;
        email: string;
        city: string;
        phone: string;
    };

    const validationSchema: { [key: string]: any } = personalSchemaForm.reduce(
        (acc, e) => ({ ...acc, [e.fieldname]: e.validator }),
        {},
    );

    validationSchema.phone = yup
        .string()
        .test(
            "phone-test",
            "Номер телефона - обязательное поле",
            val => !!val && !val?.includes("_"),
        );

    const { handleSubmit } = useForm({
        validationSchema,
    });
    const save = async () => {
        const fd = new FormData(formEl.value!);
        console.log("fd", [...fd.entries()]);

        function onInvalidSubmit<InvalidSubmissionHandler>({ values, errors, results }) {
            console.log("values", values); // current form values
            console.log("errors", errors); // a map of field names and their first error message
            console.log("results", results); // a detailed map of field names and their validation results
        }

        await handleSubmit(values => {
            console.log("save in localstorage");
            localStorage.setItem("personal", JSON.stringify(fd, null, 2));
        }, onInvalidSubmit)();
    };
</script>

<style scoped lang="sass">
    .phone-field
        display: flex
        align-items: baseline
        column-gap: 1%
        &__country
            width: 40%
            padding: 0.5em
            border: none
            border-bottom: 1px solid #0005
            font-family: Montserrat, sans-serif
            font-size: 18px

        &__phone
            width: 100%
            padding: .5em 1em
            border: none
            border-bottom: 1px solid #0005
            outline: none
            font-family: Montserrat
            font-size: 18px
</style>
