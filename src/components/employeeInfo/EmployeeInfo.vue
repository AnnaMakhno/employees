<script setup lang="ts">
import type { Employee } from "../../models/employees";
defineProps<{
  employee: Employee;
}>();
const emit = defineEmits<{
  (e: "edit", employee: Employee): void;
}>();
</script>

<template>
  <div class="employee-info">
    <div class="employee-item">
      {{ employee.name }}
    </div>
    <div class="employee-item">
      {{ employee.surname }}
    </div>
    <div class="employee-item">
      {{ employee.age }}
    </div>
    <div class="employee-item">
      {{ employee.address }}
    </div>
    <div class="employee-item">
      {{ employee.experience }}
    </div>
    <button @click="emit('edit', employee)">Edit</button>
  </div>
</template>

<style scoped>
.employee-info {
  gap: 10px;
  display: flex;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 5px;
  > *:not(:last-child) {
    border-right: 1px solid #ccc;
  }
}
.employee-item {
  padding: 10px 30px;
  width: 150px;
}
</style>
