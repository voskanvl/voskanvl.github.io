<template>
    <form action="">
        <slot></slot>
        <input type="submit" value="Отправить" />
    </form>
</template>

<script setup lang="ts">
    import { ref } from "vue";
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
    input[type="submit"]
        padding: 0.5em 1em
        margin-top: 1em
        font-size: 18px
        font-family: Oswald, sans-serif
</style>
