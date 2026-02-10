import { ref } from "vue";
import { initialEmployees, type Employee } from "../models/employees";

export function useEmployees() {
    const employees = ref<Employee[]>(initialEmployees);
    const selectedEmployee = ref<Employee | null>(null);
    const isModalOpen = ref(false);

    function openAddModal() {
        selectedEmployee.value = null;
        isModalOpen.value = true;
    }

    function openEditModal(employee: Employee) {
        selectedEmployee.value = employee;
        isModalOpen.value = true;
    }

    function submitEmployee(data: Omit<Employee, "id">) {
        if (selectedEmployee.value) {
            const index = employees.value.findIndex((e) => e.id === selectedEmployee.value!.id);
            employees.value[index] = { id: selectedEmployee.value.id, ...data };
        } else {
            employees.value.push({ id: Date.now(), ...data });
        }
    }

    function deleteEmployee(id: number) {
        employees.value = employees.value.filter((e) => e.id !== id);
    }

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

