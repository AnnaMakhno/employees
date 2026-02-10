<script setup lang="ts">
import { ref } from "vue";
import type { Employee } from "../../models/employees";
import EmployeeInfo from "../employeeInfo/EmployeeInfo.vue";
defineProps<{
  employees: Employee[];
}>();

defineEmits(["edit"]);
</script>

<template>
  <div v-for="employee in employees" :key="employee.id">
    <EmployeeInfo :employee="employee" @edit="$emit('edit', $event)" />
  </div>
</template>

<style scoped></style>
