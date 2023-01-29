<template>
    <div class="icon-with-popup">
        <div class="icon-with-popup__image" v-html="props.icon" />
        <div class="icon-with-popup__popup">{{ props.caption }}</div>
    </div>
</template>

<script setup lang="ts">
    import { ref } from "vue";
    const props = defineProps<{
        icon: string;
        caption?: string;
    }>();
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
    .icon-with-popup
        cursor: pointer
        position: relative
        font-size: 16px
        display: flex
        flex-direction: column
        align-items: center
        &__popup
            opacity: 0
            z-index: 0
            transition: opacity .5s
        &__image
            font-size: 2em
        &:hover  .icon-with-popup__popup
            opacity: 1
            z-index: 1
</style>
