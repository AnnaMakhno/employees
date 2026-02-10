import { reactive, watch, computed } from "vue";
import type { Employee } from "../model/types";

/**
 * Хук создания нового сотрудника или редактирования старого.
 * Поддерживает валидацию полей и автоматическое заполнение формы при редактировании.
 *
 * @param employee - объект сотрудника для редактирования, если null - форма пустая - добавление нового сотрудника
 * @returns {form, errors, isFormValid, hints} - данные формы, ошибки и статус валидации, подсказки
 */

export function useEmployeeForm(employee?: Employee | null) {
    // Форма с полями сотрудника, без id (id управляется контроллером)
    const form = reactive<Omit<Employee, "id">>({
        name: "",
        surname: "",
        age: 0,
        experience: 0,
        address: "",
    });

    //Заполняем форму если передан сотрудник
    watch(
        () => employee,
        (emp) => {
            if (emp) {
                Object.assign(form, emp); // копируем данные сотрудника в форму
            }
        },
        { immediate: true },
    );

    // Регулярное выражение для проверки имени и фамилии
    const nameRegex = /^[A-Za-zА-Яа-яЁё]+$/;

    // Определяем ошибки для каждого поля формы
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

    // Подсказки для полей формы
    const hints = {
        name: "Только буквы, без цифр и символов",
        surname: "Только буквы, без цифр и символов",
        age: "Возраст должен быть больше 0",
        experience: "Не может быть отрицательным и больше возраста",
        address: "Введите полный адрес проживания",
    };

    return { form, errors, isFormValid, hints };
}