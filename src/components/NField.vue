<template>
  <div class="field">
    <input
      class="field__name"
      ref="inputEl"
      :name="props.fieldname"
      :type="props.type"
      :placeholder="props.placeholder"
      :required="props.requried"
      :autocomplete="props.autocomplete"
      v-model="inputValue"
    />
    <span :class="{ field__error: true, 'field__error--deactive': !!errorMessage }">{{
      errorMessage
    }}</span>
  </div>
</template>

<script setup lang="ts">
import { ref, toRef } from "vue";
import { useField } from "vee-validate";
import { AnySchema } from "yup";
import { InputTypes } from "./Personal/Personal";

const props = defineProps<{
  placeholder?: string;
  fieldname: string;
  type: InputTypes;
  validator: AnySchema;
  requried?: boolean;
  autocomplete?: string;
  value: string;
}>();

const inputEl = ref(null);

defineExpose({ inputEl });

const emits = defineEmits(["update:value"]);

const fieldnameRef = toRef(props, "fieldname");

const { value: inputValue, errorMessage, resetField } = useField(
  fieldnameRef,
  props.validator as AnySchema
  // props.validator as RuleExpression<unknown>,
);
</script>

<style scoped lang="sass">
.field
    width: 100%
    input
        width: 95%
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
