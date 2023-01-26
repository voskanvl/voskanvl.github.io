<template>
    <div class="field">
        <input class="field__name" :type="props.type" :placeholder="placeholder" v-model="value" />
        <span :class="{ 'field__error': true, 'field__error--deactive': !!errorMessage }">{{
            errorMessage
        }}</span>
    </div>
</template>

<script setup lang="ts">
    import { ref, watch } from "vue";
    import { useField } from "vee-validate";
    import { string } from "yup";

    const props = defineProps<{
        placeholder?: string;
        fieldname: string;
        type?: string;
    }>();

    const { value, errorMessage } = useField(props.fieldname, string().min(2).required());
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
    .field

        input
            width: 100%
            padding: .5em 1em
            border: none
            border-bottom: 1px solid #0007
            outline: none
            font-family: Montserrat
            font-size: 18px

            &:focus
                border-bottom: 2px solid #000
                font-weight: 500

        &__error
            display: inline-block
            color: #f70
            transition: height .5s
            height: 0
            overflow: hidden
            &--deactive
                height: 2.5em
</style>
