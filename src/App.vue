<template>
    <Form @submit="onSubmit">
        <Field name="email" type="email" v-model="name" @click="name += '---'" :rules="validate" />
        <ErrorMessage name="email" />
        <div>{{ name }}</div>
        <button>Sign up</button>
    </Form>
</template>

<script setup lang="ts">
    import { Field, Form, ErrorMessage } from "vee-validate";
    import { ref } from "vue";
    const count = ref(0);
    const name = ref("");
    const validate = (value: any) => {
        console.log(value);
        if (!value) {
            return "This field is required";
        }
        return true;
    };
    function onSubmit(values) {
        console.log(JSON.stringify(values, null, 2));
    }
</script>
<style scoped lang="sass">
    .count
        font-size: 40px
        user-select: none
</style>
