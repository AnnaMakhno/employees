<script setup lang="ts">
import type { Employee } from "../../models/employees";
import { useEmployeeForm } from "../../composables/useEmployeeForm";

const props = defineProps<{
  employee?: Employee | null;
}>();

const emit = defineEmits<{
  (e: "close"): void;
  (e: "submit", employee: Omit<Employee, "id">): void;
}>();

const { form, errors, isFormValid, hints } = useEmployeeForm(props.employee);

function submitForm() {
  if (!isFormValid.value) return;
  emit("submit", { ...form });
  emit("close");
}
</script>

<template>
  <div class="modal-backdrop">
    <div class="modal">
      <h2>
        {{ employee ? "Редактировать сотрудника" : "Добавить сотрудника" }}
      </h2>

      <div class="field">
        <label for="name">Имя</label>
        <input
          id="name"
          v-model="form.name"
          :class="{ invalid: errors.name }"
          :title="errors.name || hints.name"
          placeholder="Введите имя"
        />
      </div>

      <div class="field">
        <label for="surname">Фамилия</label>
        <input
          id="surname"
          v-model="form.surname"
          :class="{ invalid: errors.surname }"
          :title="errors.surname || hints.surname"
          placeholder="Введите фамилию"
        />
      </div>

      <div class="field">
        <label for="age">Возраст</label>
        <input
          min="0"
          max="120"
          id="age"
          type="number"
          v-model.number="form.age"
          :class="{ invalid: errors.age }"
          :title="errors.age"
          placeholder="Возраст"
        />
      </div>

      <div class="field">
        <label for="address">Адрес</label>
        <input
          id="address"
          v-model="form.address"
          :class="{ invalid: errors.address }"
          :title="errors.address"
          placeholder="Введите адрес"
        />
      </div>

      <div class="field">
        <label for="experience">Стаж</label>
        <input
          min="0"
          id="experience"
          type="number"
          v-model.number="form.experience"
          :class="{ invalid: errors.experience }"
          :title="errors.experience"
          placeholder="Стаж"
        />
      </div>

      <div class="actions">
        <button class="cancel-btn" @click="$emit('close')">Отмена</button>
        <button class="submit-btn" :disabled="!isFormValid" @click="submitForm">
          {{ employee ? "Сохранить" : "Создать" }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-backdrop {
  padding: 20px;
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal {
  background: white;
  padding: 20px;
  width: 300px;
  border-radius: 8px;
}

input {
  display: block;
  margin-bottom: 10px;
}

.actions {
  display: flex;
  justify-content: space-between;
}

.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  background: white;
  padding: 30px 25px;
  width: 360px;
  border-radius: 12px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  gap: 15px;
  transition: transform 0.2s;
}

.modal h2 {
  margin: 0 0 10px 0;
  font-size: 1.5rem;
  text-align: center;
  color: #242424;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

label {
  font-weight: 500;
  font-size: 0.95rem;
  color: #444;
}

input {
  padding: 10px 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s;
}

input:focus {
  border-color: #dd7538;
  outline: none;
}

input.invalid {
  border-color: #e74c3c;
}

.actions {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.submit-btn {
  background-color: #dd7538;
  color: white;
  border: none;
  padding: 10px 18px;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.submit-btn:hover {
  background-color: #c36c30;
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.cancel-btn {
  background-color: #f0f0f0;
  color: #333;
  border: none;
  padding: 10px 18px;
  font-size: 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.cancel-btn:hover {
  background-color: #e0e0e0;
}

@media (max-width: 400px) {
  .modal {
    width: 90%;
    padding: 20px;
  }
}
</style>
