import { reactive, watch, computed } from "vue";
import type { Employee } from "../models/employees";

export function useEmployeeForm(employee?: Employee | null) {
    const form = reactive<Omit<Employee, "id">>({
        name: "",
        surname: "",
        age: 0,
        experience: 0,
        address: "",
    });

    watch(
        () => employee,
        (emp) => {
            if (emp) {
                Object.assign(form, emp);
            }
        },
        { immediate: true },
    );

    const nameRegex = /^[A-Za-zА-Яа-яЁё]+$/;

    const errors = computed(() => ({
        name: !form.name
            ? "Введите имя"
            : !nameRegex.test(form.name)
                ? "Имя должно содержать только буквы"
                : "",

        surname: !form.surname
            ? "Введите фамилию"
            : !nameRegex.test(form.surname)
                ? "Фамилия должна содержать только буквы"
                : "",

        age:
            form.age <= 0
                ? "Возраст должен быть больше 0"
                : form.age > 120
                    ? "Слишком большой возраст"
                    : "",

        experience:
            form.experience < 0
                ? "Стаж не может быть отрицательным"
                : form.experience > form.age
                    ? "Стаж не может быть больше возраста"
                    : "",

        address: !form.address ? "Введите адрес" : "",
    }));

    const isFormValid = computed(() =>
        Object.values(errors.value).every((e) => !e),
    );

    const hints = {
        name: "Только буквы, без цифр и символов",
        surname: "Только буквы, без цифр и символов",
        age: "Возраст должен быть больше 0",
        experience: "Не может быть отрицательным и больше возраста",
        address: "Введите полный адрес проживания",
    };

    return { form, errors, isFormValid, hints };
}