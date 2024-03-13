export function getDayOfWeek(date: Date): string {
  const daysOfWeek: string[] = [
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота",
    "Воскресенье",
  ];
  const dayIndex: number = date.getDay() === 0 ? 6 : date.getDay() - 1; // Если getDay() возвращает 0 (воскресенье), то заменяем его на 6
  return daysOfWeek[dayIndex];
}
