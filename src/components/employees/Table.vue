<script setup lang="ts">
import type { Employee } from "../../models/employees";
import EmployeeInfo from "./EmployeeInfo.vue";


defineProps<{
  employees: Employee[];
}>();

defineEmits(["edit", "delete"]);
</script>

<template>
  <div class="table-container">
    <div class="table-body-wrapper">
      <table class="employees-table">
        <thead>
          <tr>
            <th>Имя</th>
            <th>Фамилия</th>
            <th>Возраст</th>
            <th>Адрес</th>
            <th>Опыт</th>
            <th></th>
            <!-- для Edit -->
            <th></th>
            <!-- для Delete -->
          </tr>
        </thead>

        <tbody>
          <EmployeeInfo
            v-for="employee in employees"
            :key="employee.id"
            :employee="employee"
            @edit="$emit('edit', $event)"
            @delete="$emit('delete', $event)"
          />
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.table-container {
  display: flex;
  flex-direction: column;
  max-width: 100%;
}

.table-body-wrapper {
  max-height: 80vh; /* высота для прокрутки */
  overflow-y: auto; /* вертикальный скролл */
}

.table-body-wrapper table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 10px;
}

.employees-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 10px;
  min-width: 600px;
}

th {
  background-color: #f5f5f5;
  text-align: center;
  padding: 12px 20px;
  font-weight: 600;
}

td {
  padding: 12px 20px;
  background-color: white;
  border-radius: 8px;
}

tbody tr:nth-child(even) td {
  background-color: #f9f9f9;
}

thead th {
  position: sticky;
  top: 0;
  z-index: 2;
  background: #f5f5f5;
}

.table-container {
  overflow-x: auto;
}
</style>
