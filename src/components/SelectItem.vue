<script setup>
import { onMounted, ref, watch } from "vue";

const props = defineProps({
  select: Object,
  cityValue: Number,
  workshopValue: Number,
  employeeValue: Number,
});

const itemsOption = ref([]);

watch(
  () => [props.cityValue, props.workshopValue, props.employeeValue],
  () => {
    if (props.cityValue) {
      if (props.select.name === "cities") {
        itemsOption.value = props.select.items.map((item) => {
          item.id === props.cityValue
            ? (item.selected = true)
            : (item.selected = false);
          return item;
        });
      }
      if (props.select.name === "workshops") {
        itemsOption.value = props.select.items.filter(
          (item) => item.cityId === props.cityValue
        );
      }
      if (props.select.name === "employees") {
        itemsOption.value = props.select.items.filter(
          (item) => item.cityId === props.cityValue
        );
      }
    }
    if (props.workshopValue) {
      if (props.select.name === "workshops") {
        itemsOption.value = props.select.items.map((item) => {
          item.id === props.workshopValue
            ? (item.selected = true)
            : (item.selected = false);
          return item;
        });
      }
      if (props.select.name === "employees") {
        itemsOption.value = props.select.items.filter(
          (item) => item.workshopId === props.workshopValue
        );
      }
    }
    if (props.employeeValue) {
      if (props.select.name === "employees") {
        itemsOption.value = props.select.items.map((item) => {
          item.id === props.employeeValue
            ? (item.selected = true)
            : (item.selected = false);
          return item;
        });
      }
    }
    if (!props.cityValue && !props.workshopValue && !props.employeeValue) {
      itemsOption.value = props.select.items.map((item) => {
        item.selected = false;
      });
    }
  }
);

onMounted(() => {
  itemsOption.value = props.select.items;
});
</script>

<template>
  <select :name="select.name" class="select">
    <option value="" disabled selected>Выберите {{ select.text }}</option>
    <option
      v-for="item in itemsOption"
      :key="item.id"
      :value="item.id"
      :selected="item.selected"
      :data-city-id="item.cityId"
      :data-workshop-id="item.workshopId"
    >
      {{ item.name }}
    </option>
  </select>
</template>

<style lang="scss" scoped>
.select {
  width: 100%;
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
  line-height: 20px;

  &:hover {
    cursor: pointer;
  }

  &:focus {
    outline: 2px solid #107eff;
  }
}
</style>
