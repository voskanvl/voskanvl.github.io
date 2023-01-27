<template>
    <form class="personal">
        <NField
            v-for="p in Personal"
            :placeholder="p.placeholder"
            :fieldname="p.fieldname"
            :validator="p.validator"
            :type="p.type"
            :key="p.id"
        />
    </form>
</template>

<script setup lang="ts">
    import { ref } from "vue";
    import NField from "../NField.vue";
    import * as yup from "yup";
    import Personal from "./Personal";

    const nameValidator = yup.string().min(2).required();
    const dateValidator = yup.date();
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass"></style>
