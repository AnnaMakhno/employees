<script setup lang="ts">
import { reactive, watch } from "vue";
import type { Employee } from "../../models/employees";

const props = defineProps<{
  employee?: Employee | null;
}>();

const emit = defineEmits<{
  (e: "close"): void;
  (e: "submit", employee: Omit<Employee, "id">): void;
}>();

const form = reactive<Omit<Employee, "id">>({
  name: "",
  surname: "",
  age: 0,
  experience: 0,
  address: "",
});

watch(
  () => props.employee,
  (emp) => {
    if (emp) {
      Object.assign(form, emp);
    }
  },
  { immediate: true },
);

function submitForm() {
  emit("submit", { ...form });
  emit("close");
}
</script>

<template>
  <div class="modal-backdrop">
    <div class="modal">
      <h2>{{ employee ? "Edit employee" : "Add employee" }}</h2>

      <input v-model="form.name" placeholder="Name" />
      <input v-model="form.surname" placeholder="Surname" />
      <input v-model.number="form.age" type="number" placeholder="Age" />
      <input
        v-model.number="form.experience"
        type="number"
        placeholder="Experience"
      />
      <input v-model="form.address" placeholder="Address" />

      <div class="actions">
        <button @click="submitForm">
          {{ employee ? "Save" : "Create" }}
        </button>
        <button @click="$emit('close')">Cancel</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-backdrop {
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
  width: 100%;
  margin-bottom: 10px;
}

.actions {
  display: flex;
  justify-content: space-between;
}
</style>
