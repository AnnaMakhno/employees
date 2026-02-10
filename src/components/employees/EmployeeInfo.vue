<script setup lang="ts">
import type { Employee } from "../../models/employees";
import EditIcon from '../../assets/EditIcon.svg';
import DeleteIcon from '../../assets/DeleteIcon.svg';

defineProps<{
  employee: Employee;
}>();
const emit = defineEmits<{
  (e: "edit", employee: Employee): void;
  (e: "delete", employeeId: number): void;
}>();
</script>

<template>
  <tr class="employee-info">
    <td class="employee-item">
      {{ employee.name }}
    </td>
    <td class="employee-item">
      {{ employee.surname }}
    </td>
    <td class="employee-item">
      {{ employee.age }}
    </td>
    <td class="employee-item address-cell">
      {{ employee.address }}
    </td>
    <td class="employee-item">
      {{ employee.experience }}
    </td>
    <td class="employee-item">
      <button @click="emit('edit', employee)"> <EditIcon class="edit-icon"/></button>
    </td>
    <td class="employee-item">
      <button @click="emit('delete', employee.id)"><DeleteIcon class="delete-icon"/></button>
    </td>
  </tr>
</template>

<style scoped>
.employee-item {
  padding: 12px 20px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis; /* ... если текст не помещается */
}

.address-cell {
  max-width: 200px; /* подстраиваем ширину под дизайн */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis; /* добавляет ... если не помещается */
}

.employee-item button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-weight: bold;
  color: #dd7538;
}

.employee-item button:hover {
  color: #c36c30;
}

.edit-icon {
  width: 25px;
  height: 25px;
}

.delete-icon{
    width: 30px;
  height: 30px;

}

button:hover {
  fill: #c36c30;
  transform: scale(1.1);
}
</style>
