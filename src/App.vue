<template>
    <Form>
        <Field name="email" type="email" v-model="name" />
        <div>{{ name }}</div>
    </Form>
</template>

<script setup lang="ts">
    import { Field, Form } from "vee-validate";
    import { ref } from "vue";
    const count = ref(0);
    const name = "";
</script>
<style scoped lang="sass">
    .count
        font-size: 40px
        user-select: none
</style>
