<template>
    <div
        class="accordion"
        v-for="(title, idx) in props.titles"
        :key="title"
        :data-id="idx"
        @click="currentTab = idx"
        :data-hidden="idx !== currentTab"
    >
        <div class="accordion__title">
            <span>{{ title }}</span
            ><i class="accordion__icon">{{ "\u25BC" }}</i>
        </div>
        <div class="accordion__content">
            <slot :name="title" :data-idx="idx"></slot>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref } from "vue";
    const props = defineProps<{
        titles: string[];
    }>();
    let currentTab = ref(0);
</script>

<style scoped lang="sass">
    .accordion
        &__title
            text-transform: uppercase
            font-weight: 700
            text-align: left
            cursor: pointer
            padding: .5em 0
            display: flex
            align-items: center
        &__content
            max-height: 50vh
            transition: 1s
        &__icon
            display: block
            width: 1em
            height: 1em
            rotate: 180deg
            transform-origin: center
            transition: 1s
            line-height: 1

        &[data-hidden="true"]
            & .accordion__icon
                rotate: 0deg
            & .accordion__content
                overflow: hidden
                max-height: 0
</style>
