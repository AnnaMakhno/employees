<script setup lang="ts">
import Table from "../components/employees/Table.vue";
import EmployeeForm from "../components/employees/EmployeeForm.vue";
import { useEmployees } from "../composables/useEmployees";

const {
  employees,
  selectedEmployee,
  isModalOpen,
  openAddModal,
  openEditModal,
  submitEmployee,
  deleteEmployee,
  closeModal,
} = useEmployees();
</script>

<template>
  <div>
    <div class="header">
      <h1>Сотрудники</h1>
      <button class="add-btn" @click="openAddModal">+</button>
    </div>
    <Table
      :employees="employees"
      @edit="openEditModal"
      @delete="deleteEmployee"
    />
    <EmployeeForm
      v-if="isModalOpen"
      :employee="selectedEmployee"
      @close="closeModal"
      @submit="submitEmployee"
    />
  </div>
</template>

<style scoped>
.employees-page {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.add-btn {
  background-color: #dd7538;
  color: white;
  border: none;
  padding: 0.6em 1.2em;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.add-btn:hover {
  background-color: #c36c30;
}
</style>
