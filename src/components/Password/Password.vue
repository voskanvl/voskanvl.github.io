<template>
    <form class="password" @submit="save">
        <div class="password__title">
            Ваш текущий пароль: <strong>{{ currentPass }}</strong>
        </div>
        <n-field
            fieldname="pass"
            :validator="passValidator"
            type="password"
            ref="passEl"
            placeholder="Введите новый пароль"
            autocomplete="password"
            value=""
        />
        <n-field
            fieldname="repeatpass"
            :validator="repeatPassValidator"
            type="password"
            placeholder="Повторите новый пароль"
            autocomplete="password"
            value=""
        />
        <input type="submit" value="Отправить" :class="{ green: isOk }" @click.prevent="save" />
    </form>
</template>

<script setup lang="ts">
    import { onMounted, ref } from "vue";
    import passwordSchemaForm from "./Password";
    import NField from "../NField.vue";
    import * as yup from "yup";
    import YupPassword from "yup-password";
    import { useForm } from "vee-validate";
    YupPassword(yup);

    const randomPass = () => "GHDiU-UI&gh5";
    const isOk = ref(false);
    const currentPass = ref(randomPass());

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

    const { handleSubmit } = useForm({
        validationSchema: {
            pass: passValidator,
            repeatpass: repeatPassValidator,
        },
    });
    const save = async () => {
        await handleSubmit(values => {
            localStorage.setItem("pass", JSON.stringify(values.pass));
            isOk.value = true;
        })();
    };

    onMounted(() => {
        const localPass = localStorage.getItem("pass");
        if (!localPass) return;
        currentPass.value = JSON.parse(localPass);
    });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scope lang="sass">
    .password
        &__title
            margin-bottom: 1em
    .green
        color: #7f0
</style>
