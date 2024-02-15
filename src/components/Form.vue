<script setup>
import SelectsList from "./SelectsList.vue";
import Button from "./Button.vue";
import { ref } from "vue";

const isDisable = ref(false);
const selectedValues = ref([]);

const changeDisable = (value) => {
  isDisable.value = value;
};

const updateSelectedValues = (values) => {
  selectedValues.value = values;
};

const submitForm = (event) => {
  event.preventDefault();

  const mergedObject = {};

  selectedValues.value.forEach((item) => {
    mergedObject[item.name] = item.value;
  });

  document.cookie = "formData=" + JSON.stringify(mergedObject);
  event.target.reset();
};
</script>

<template>
  <form class="form" @submit="submitForm">
    <h1>Форма заполнения</h1>
    <SelectsList
      @is-empty-field="changeDisable"
      @update-selected-values="updateSelectedValues"
    />
    <Button :disabled="!isDisable" />
  </form>
</template>

<style lang="scss" scoped>
.form {
  margin: 0 auto;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 25px;
}
</style>
