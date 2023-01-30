<template>
  <form class="personal" ref="formEl">
    <n-field
      v-for="p in Personal"
      :placeholder="p.placeholder"
      :fieldname="p.fieldname"
      :name="p.fieldname"
      :validator="p.validator"
      :type="p.type"
      :key="p.id"
      :value="p.value"
    />
    <phone-field :country-list="countryList" />
    <input type="submit" value="Отправить" @click.prevent="save" />
  </form>
</template>

<script setup lang="ts">
import { onMounted, ref, reactive, Ref } from "vue";
import NField from "../NField.vue";
import * as yup from "yup";
import "yup-phone";
import Personal from "./Personal";
import countryList from "../../../countryCode.js";
import IMask from "imask";
import { useField, useForm } from "vee-validate";
import personalSchemaForm from "./Personal";
import PhoneField from "../PhoneField.vue";

const formEl = ref<HTMLFormElement | null>(null);

onMounted(() => {
  const data = localStorage.getItem("personal");
  if (!data) return;
  const dataParsed = JSON.parse(data);
  Personal.forEach((e) => {
    !!dataParsed[e.fieldname] && (e.value = dataParsed![e.fieldname]);
  });
});

// const phone = ref("");

type FormFields = {
  name: string;
  birth: string;
  email: string;
  city: string;
  phone: string;
};

const validationSchema: { [key: string]: any } = personalSchemaForm.reduce(
  (acc, e) => ({ ...acc, [e.fieldname]: e.validator }),
  {}
);

validationSchema.phone = yup
  .string()
  .test(
    "phone-test",
    "Номер телефона - обязательное поле",
    (val) => !!val && !val?.includes("_")
  );

const { handleSubmit } = useForm({
  validationSchema,
});
const save = async () => {
  const fd = new FormData(formEl.value!);
  console.log("fd", [...fd.entries()]);

  function onInvalidSubmit<InvalidSubmissionHandler>({ values, errors, results }) {
    console.log("values", values); // current form values
    console.log("errors", errors); // a map of field names and their first error message
    console.log("results", results); // a detailed map of field names and their validation results
  }

  await handleSubmit((values) => {
    console.log("save in localstorage");
    localStorage.setItem("personal", JSON.stringify(fd, null, 2));
  }, onInvalidSubmit)();
};
</script>

<style scoped lang="sass">
.personal
    display: flex
    flex-direction: column
    row-gap: 1em
</style>
