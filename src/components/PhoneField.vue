<template>
    <div class="phone-field">
        <select
            name="country"
            class="phone-field__country"
            v-model="countryValue"
            @change="changeSelect"
        >
            <option
                v-for="country in countryList"
                :value="country.code"
                :key="country.code"
                :selected="countryValue === country.country"
            >
                {{ country.country }}
            </option>
        </select>
        <input
            name="phone"
            class="phone-field__phone"
            v-mask
            v-model="phone"
            @input="emits('update:modelValue', $event.target.value)"
        />
        <span :class="{ 'field__error': true, 'field__error--deactive': !!errorMessage }">{{
            errorMessage
        }}</span>
    </div>
</template>

<script setup lang="ts">
    import { onMounted, onUpdated, ref, Ref } from "vue";
    import IMask from "imask";
    import { useField } from "vee-validate";
    import * as yup from "yup";

    const props = defineProps<{
        countryList: { country: string; code: string }[];
    }>();

    const emits = defineEmits(["update:modelValue"]);

    const countryValue = ref("+7");
    const mask: Ref<IMask.InputMask<any> | null> = ref(null);

    const vMask = {
        mounted(el: HTMLInputElement) {
            mask.value = IMask(el, {
                mask: `{${countryValue.value}}(000)000-00-00`,
                lazy: false,
            });
        },
    };

    const changeSelect = (event: Event) => {
        mask.value?.updateOptions({
            mask: `{${(event.target! as HTMLSelectElement).value}}(000)000-00-00`,
        });
        console.log("🚀 ~ mask.value", mask.value);
        const matchPhone = phone.value.match(/\+\d+(\(.*)/);
        const withoutCode = !!matchPhone && matchPhone.length > 1 ? matchPhone[1] : "";
        console.log("withoutCode", withoutCode);
        phone.value = `${countryValue.value}${withoutCode}`;
        mask.value?.updateValue();
    };

    const { value: phone, errorMessage } = useField(
        "phone",
        yup
            .string()
            .test(
                "phone-test",
                "Номер телефона - обязательное поле",
                val => !!val && !val?.includes("_"),
            ),
    );

    // onMounted(() => {
    //     phone.value = props.modelValue;
    // });
    // onUpdated(() => {
    //     phone.value = props.modelValue;
    // });
</script>

<style scoped lang="sass">
    .phone-field
        display: flex
        align-items: baseline
        column-gap: 1%
        &__country
            width: 40%
            padding: 0.5em
            border: none
            border-bottom: 1px solid #0005
            font-family: Montserrat, sans-serif
            font-size: 18px

        &__phone
            width: 100%
            padding: .5em 1em
            border: none
            border-bottom: 1px solid #0005
            outline: none
            font-family: Montserrat
            font-size: 18px
</style>
