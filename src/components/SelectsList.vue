<script setup>
import SelectItem from "./SelectItem.vue";
import { useSelectsStore } from "./store/selects";
import { onMounted, ref, watch } from "vue";

const emit = defineEmits(["is-empty-field", "update-selected-values"]);

const selectsStore = useSelectsStore();
const cityValue = ref(0);
const workshopValue = ref(0);
const employeeValue = ref(0);
const selectsList = ref([]);
let selectsElements = [];

const changeSelect = (select) => {
  if (select.target.name === "cities") {
    cityValue.value = parseInt(select.target.value);
    workshopValue.value = 0;
    employeeValue.value = 0;
  }
  if (select.target.name === "workshops") {
    workshopValue.value = parseInt(select.target.value);
    cityValue.value = parseInt(select.target.selectedOptions[0].dataset.cityId);
    employeeValue.value = 0;
  }
  if (select.target.name === "employees") {
    employeeValue.value = parseInt(select.target.value);
    cityValue.value = parseInt(select.target.selectedOptions[0].dataset.cityId);
    workshopValue.value = parseInt(
      select.target.selectedOptions[0].dataset.workshopId
    );
  }
  selectsElements.forEach((item) => {
    if (item.name === select.target.name) {
      item.value = select.target.selectedOptions[0].innerText;
    }
  });
  isEmptyField();
  emit("update-selected-values", selectsElements);
};

const isEmptyField = () => {
  const isEmpty = selectsElements.every((item) => item.value);

  if (isEmpty) {
    cityValue.value = 0;
    workshopValue.value = 0;
    employeeValue.value = 0;
  }

  emit("is-empty-field", isEmpty);
};

onMounted(async () => {
  try {
    await selectsStore.createSelects();
    selectsList.value = selectsStore.getSelects;
    selectsList.value.forEach((item) => {
      selectsElements.push({ name: item.name, value: "" });
    });
  } catch (error) {
    console.error(error);
  }
});
</script>

<template>
  <section v-show="selectsList.length" class="selections">
    <SelectItem
      v-for="select in selectsList"
      :key="select.id"
      :select="select"
      :city-value="cityValue"
      :workshop-value="workshopValue"
      :employee-value="employeeValue"
      @change="changeSelect"
    />
  </section>
</template>

<style lang="scss" scoped>
.selections {
  width: 100%;
  max-width: 320px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}
</style>
