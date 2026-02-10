import { ref } from "vue";
import type { Employee } from "../model/types";
import { initialEmployees } from "../model/employees";
import { generateId } from "../../../shared/lib/uuid";

/**
 * Контроллер для управления списком сотрудников
 * - добавление нового сотрудника
 * - редактирование существующего
 * - удаление сотрудника
 * - управление модальным окном
 *
 * @returns {employees, selectedEmployee, isModalOpen, ...actions} - данные и функции управления сотрудниками
 */

export function useEmployees() {
    const employees = ref<Employee[]>(initialEmployees); // массив сотрудников
    const selectedEmployee = ref<Employee | null>(null); // текущий редактируемый сотрудник
    const isModalOpen = ref(false); // состояние модального окна

    // Открытие модального окна при добавлении
    function openAddModal() {
        selectedEmployee.value = null;
        isModalOpen.value = true;
    }

    // Открытие модального окна при редактировании
    function openEditModal(employee: Employee) {
        selectedEmployee.value = employee;
        isModalOpen.value = true;
    }

    // Добавление нового сотрудника или обновление существующего
    function submitEmployee(data: Omit<Employee, "id">) {
        if (selectedEmployee.value) {
            const index = employees.value.findIndex((e) => e.id === selectedEmployee.value!.id);
            employees.value[index] = { id: selectedEmployee.value.id, ...data };
        } else {
            employees.value.push({ id: generateId(), ...data });
        }
    }

    // Удаление сотрудника по id
    function deleteEmployee(id: string) {
        employees.value = employees.value.filter((e) => e.id !== id);
    }

     // Закрытие модального окна
    function closeModal() {
        isModalOpen.value = false;
    }

    return {
        employees,
        selectedEmployee,
        isModalOpen,
        openAddModal,
        openEditModal,
        submitEmployee,
        deleteEmployee,
        closeModal,
    };
}

