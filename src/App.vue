<template>
    <Form @submit="onSubmit">
        <Field name="email" type="email" v-model="value" @click="name += '---'" />
        <ErrorMessage name="email" />
        <div>{{ name }} {{ value }} {{ errorMessage }}</div>
        <button>Sign up</button>
        <Accordion :titles="['avatar', 'personal', 'password']">
            <template #avatar><Avatar /></template>
            <template #personal><Personal /></template>
            <template #password> CCC </template>
        </Accordion>
    </Form>
</template>

<script setup lang="ts">
    import { ref } from "vue";
    import { Field, Form, ErrorMessage, useField } from "vee-validate";
    import Accordion from "./components/Accordion.vue";
    import Avatar from "./components/Avatar.vue";
    import Personal from "./components/Personal/Personal.vue";

    const count = ref(0);
    const name = ref("");
    // const validate = async (value: string) => {
    //     console.log(value);
    //     if (!value) {
    //         await new Promise(res => setTimeout(res, 2000));
    //         return "This field is required";
    //     }
    //     return true;
    // };
    const { value, errorMessage } = useField("email", async val => {
        if (!val) {
            await new Promise(res => setTimeout(res, 2000));
            return "This field is required";
        }
        return true;
    });
    function onSubmit(values: object) {
        console.log(JSON.stringify(values, null, 2));
    }
</script>
<style scoped lang="sass">
    .count
        font-size: 40px
        user-select: none
</style>
