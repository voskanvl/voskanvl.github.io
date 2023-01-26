<template>
    <form class="personal">
        <NField placeholder="Имя" fieldname="name" />
        <NField placeholder="Дата рождения" fieldname="birth" type="date" />
    </form>
</template>

<script setup lang="ts">
    import { ref } from "vue";
    import NField from "./NField.vue";
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass"></style>
