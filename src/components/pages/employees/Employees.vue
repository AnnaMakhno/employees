<script setup lang="ts">
import { ref } from "vue";
import Table from "../../table/Table.vue";
import type { Employee } from "../../../models/employees";
import ModalWindow from "../../modalWindow/ModalWindow.vue";

const employees = ref<Employee[]>([
  {
    id: 1,
    name: "John",
    surname: "Doe",
    age: 30,
    address: "123 Main St",
    experience: 5,
  },
  {
    id: 2,
    name: "Jane",
    surname: "Smith",
    age: 25,
    address: "456 Oak Ave",
    experience: 3,
  },
  {
    id: 3,
    name: "Alice",
    surname: "Johnson",
    age: 35,
    address: "789 Pine Rd",
    experience: 7,
  },
]);

const isModalOpen = ref(false);
const selectedEmployee = ref<Employee | null>(null);

function openAddModal() {
  selectedEmployee.value = null;
  isModalOpen.value = true;
}

function submitEmployee(data: Omit<Employee, "id">) {
  if (selectedEmployee.value) {
    // EDIT
    const index = employees.value.findIndex(
      (e) => e.id === selectedEmployee.value!.id,
    );

    employees.value[index] = {
      id: selectedEmployee.value.id,
      ...data,
    };
  } else {
    // ADD
    employees.value.push({
      id: Date.now(),
      ...data,
    });
  }
}

function openEditModal(employee: Employee) {
  selectedEmployee.value = employee;
  isModalOpen.value = true;
}
</script>

<template>
  <div>
    <h1>Employees</h1>
    <button @click="openAddModal">Add new employee</button>
    <Table :employees="employees" @edit="openEditModal" />
    <ModalWindow
      v-if="isModalOpen"
      :employee="selectedEmployee"
      @close="isModalOpen = false"
      @submit="submitEmployee"
    />
  </div>
</template>

<style scoped></style>
