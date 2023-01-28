<template>
    <div class="field">
        <input
            class="field__name"
            ref="inputEl"
            :type="props.type"
            :placeholder="placeholder"
            v-model="value"
            :required="props.requried"
            :autocomplete="props.autocomplete"
        />
        <span :class="{ 'field__error': true, 'field__error--deactive': !!errorMessage }">{{
            errorMessage
        }}</span>
    </div>
</template>

<script setup lang="ts">
    import { onMounted, ref } from "vue";
    import { useField } from "vee-validate";
    import { AnySchema } from "yup";

    const props = defineProps<{
        placeholder?: string;
        fieldname: string;
        type:
            | "button"
            | "checkbox"
            | "color"
            | "date"
            | "datetime-local"
            | "email"
            | "file"
            | "hidden"
            | "image"
            | "month"
            | "number"
            | "password"
            | "radio"
            | "range"
            | "reset"
            | "search"
            | "submit"
            | "tel"
            | "text"
            | "time"
            | "url"
            | "week";
        validator: AnySchema;
        requried?: boolean;
        autocomplete?: string;
    }>();

    const inputEl = ref(null);

    defineExpose({ inputEl });

    const { value, errorMessage } = useField(
        props.fieldname,
        props.validator as AnySchema,
        // props.validator as RuleExpression<unknown>,
    );
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
    .field

        input
            width: 100%
            padding: .5em 1em
            border: none
            border-bottom: 2px solid #0004
            outline: none
            font-family: Montserrat
            font-size: 18px
            @media (prefers-color-scheme: dark)
                border-bottom: 2px solid #fff4

            &:focus
                border-bottom: 2px solid #000
                font-weight: 500
                @media (prefers-color-scheme: dark)
                    border-bottom: 2px solid #fff9

        &__error
            display: inline-block
            color: #f70
            transition: height .5s
            height: 2.5em
            overflow: hidden
            &--deactive
                height: 2.5em
</style>
