/**
 * Утилита для генерации уникальных идентификаторов сотрудников.
 * Использует встроенный Web API crypto.randomUUID(), который гарантирует уникальность.
 * @returns {string} - уникальный идентификатор
 */

export function generateId(): string {
    return crypto.randomUUID();
}