<template>
    <form class="personal" ref="formEl">
        <n-field
            v-for="p in personalRef"
            :placeholder="p.placeholder"
            :fieldname="p.fieldname"
            :name="p.fieldname"
            :validator="(p.validator as AnySchema)"
            :type="p.type"
            :key="p.id"
            :value="p.value"
        />
        <phone-field :country-list="countryList" />
        <input type="submit" value="Отправить" @click.prevent="save" :class="{ green: isOk }" />
    </form>
</template>

<script setup lang="ts">
    import { onMounted, ref, reactive } from "vue";
    import NField from "../NField.vue";
    import * as yup from "yup";
    import "yup-phone";
    import Personal from "./Personal";
    import countryList from "../../../countryCode.js";
    import IMask from "imask";
    import { useField, useForm } from "vee-validate";
    import personalSchemaForm from "./Personal";
    import PhoneField from "../PhoneField.vue";
    import { AnySchema } from "yup";

    const formEl = ref<HTMLFormElement | null>(null);

    const personalRef = reactive(Personal);

    const isOk = ref(false);

    onMounted(() => {
        const data = localStorage.getItem("personal");
        if (!data) return;
        const dataParsed = JSON.parse(data);
        personalRef.forEach(e => {
            !!dataParsed[e.fieldname] && (e.value = dataParsed![e.fieldname]);
        });
        console.log("🚀 ~ personalRef", personalRef);
    });

    // const phone = ref("");

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
        await handleSubmit(values => {
            localStorage.setItem("personal", JSON.stringify(values));
            isOk.value = true;
        })();
    };
</script>

<style scoped lang="sass">
    .personal
        display: flex
        flex-direction: column
        row-gap: 1em
    .green
        color: #7f0
</style>
