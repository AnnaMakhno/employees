import { generateId } from "../../../shared/lib/uuid";
import type {Employee} from "./types";

/**
 * Начальный список сотрудников для демонстрации работы приложения.
 * Используется при инициализации состояния в useEmployees().
 */

export const initialEmployees: Employee[] = [
    {
        id: generateId(),
        name: "Иван",
        surname: "Иванов",
        age: 30,
        address: "г. Москва, ул. Ленина, д. 123",
        experience: 5,
    },
    {
        id: generateId(),
        name: "Петр",
        surname: "Петров",
        age: 25,
        address: "г. Санкт-Петербург, ул. Пушкина, д. 456",
        experience: 3,
    },
    {
        id: generateId(),
        name: "Алиса",
        surname: "Сидорова",
        age: 35,
        address: "г. Новосибирск, ул. Сидорова, д. 789",
        experience: 7,
    },
];