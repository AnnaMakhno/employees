<script setup lang="ts">
import Table from "./Table.vue";
import EmployeeForm from "./EmployeeForm.vue";
import { useEmployees } from "../controller/useEmployees";

/**
 * Подключаем хук useEmployees для управления списком сотрудников.
 * - employees: массив сотрудников
 * - selectedEmployee: выбранный для редактирования сотрудник
 * - isModalOpen: состояние модального окна
 * - openAddModal / openEditModal / closeModal: методы управления модальным окном
 * - submitEmployee / deleteEmployee: методы для сотрудников
 */

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
    <!-- Заголовок страницы с кнопкой добавления нового сотрудника -->
    <div class="header">
      <h1>Сотрудники</h1>
      <button class="add-btn" @click="openAddModal">+</button>
    </div>
    <!-- Таблица сотрудников -->
    <Table
      :employees="employees"
      @edit="openEditModal"
      @delete="deleteEmployee"
    />
    <!-- Модальное окно формы сотрудника -->
    <EmployeeForm
      v-if="isModalOpen"
      :employee="selectedEmployee"
      @close="closeModal"
      @submit="submitEmployee"
    />
  </div>
</template>

<style scoped>
/* Стили страницы сотрудников */
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
