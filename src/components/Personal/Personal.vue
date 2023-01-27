<template>
    <form class="personal">
        <n-field
            v-for="p in Personal"
            :placeholder="p.placeholder"
            :fieldname="p.fieldname"
            :validator="p.validator"
            :type="p.type"
            :key="p.id"
        />
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
            <input name="phone" class="phone-field__phone" v-mask v-model="phone" />
        </div>
    </form>
</template>

<script setup lang="ts">
    import { onMounted, ref, reactive } from "vue";
    import NField from "../NField.vue";
    import * as yup from "yup";
    import "yup-phone";
    import Personal from "./Personal";
    import countryList from "../../../countryCode.js";
    import IMask from "imask";

    const phone = ref("");
    const countryValue = ref("+7");
    const mask = ref({ mask: `{${countryValue.value}}(000)000-00-00` });

    const vMask = {
        mounted(el: HTMLInputElement) {
            mask.value = IMask(el, { mask: `{${countryValue.value}}(000)000-00-00` });
        },
        updated(el: HTMLInputElement) {
            mask.value.mask = `{${countryValue.value}}(000)000-00-00`;
        },
    };

    const changeSelect = (event: Event) => {
        mask.value.mask = `{${(event.target! as HTMLSelectElement).value}}(000)000-00-00`;
        console.log("🚀 ~ mask.value", mask.value);
        const matchPhone = phone.value.match(/\+\d+(\(.*)/);
        const withoutCode = !!matchPhone && matchPhone.length > 1 ? matchPhone[1] : "";
        phone.value = `${countryValue.value}${withoutCode}`;
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
