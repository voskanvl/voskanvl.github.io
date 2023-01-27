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
            <select name="country" class="phone-field__country" v-model="countryValue">
                <option v-for="country in countryList" :value="country.code" :key="country.code">
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
    const countryValue = ref("");
    const mask = ref({ mask: `{${countryValue.value}}(000)000-00-00` });

    const vMask = {
        mounted(el: HTMLInputElement) {
            mask.value = IMask(el, { mask: `{${countryValue.value}}(000)000-00-00` });
        },
        updated(el: HTMLInputElement) {
            mask.value.mask = `{${countryValue.value}}(000)000-00-00`;
        },
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
            width: 69%
</style>
