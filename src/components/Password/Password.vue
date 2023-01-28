<template>
    <n-form class="password">
        <div class="password__title">Ваш текущий пароль: <strong>GHDiU-UI&gh5</strong></div>
        <n-field
            fieldname="pass"
            :validator="passValidator"
            type="password"
            ref="passEl"
            placeholder="Введите новый пароль"
            autocomplete="password"
        />
        <n-field
            fieldname="repeatpass"
            :validator="repeatPassValidator"
            type="password"
            placeholder="Повторите новый пароль"
            autocomplete="password"
        />
    </n-form>
</template>

<script setup lang="ts">
    import { ref } from "vue";
    import passwordSchemaForm from "./Password";
    import NField from "../NField.vue";
    import NForm from "../NForm.vue";
    import * as yup from "yup";
    import YupPassword from "yup-password";
    YupPassword(yup);

    const passEl = ref();

    const passValidator = yup
        .string()
        .password()
        .min(6, "количество символов должно быть не меньше 6 символов")
        .minLowercase(1, "пароль должен содержать минимум одну прописную букву")
        .minUppercase(1, "пароль должен содержать минимум одну заглавную букву")
        .minNumbers(1, "пароль должен содержать не менее одной цифры")
        .minSymbols(1, "пароль должен содержать не менее одного символа (!@#$%^ ... итд)")
        .required("Это поле обязательно для заполнения");

    const repeatPassValidator = yup
        .string()
        .test("pass-is-equal", `Введенные пароли не одинаковы`, value => {
            console.log(
                "passEl.value",
                value,
                passEl.value.inputEl.value,
                value === passEl.value.inputEl.value,
            );
            return value === passEl.value.inputEl.value;
        });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scope lang="sass">
    .password
        &__title
            margin-bottom: 1em
</style>
