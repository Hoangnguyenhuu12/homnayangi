import type { MealType } from './i18n';

/**
 * Tự động xác định bữa ăn theo giờ hệ thống của thiết bị:
 * - 05:00 - 10:30: Sáng (breakfast)
 * - 10:30 - 14:00: Trưa (lunch)
 * - 14:00 - 17:30: Chiều (afternoon)
 * - 17:30 - 22:00: Tối (dinner)
 * - 22:00 - 05:00: Khuya (latenight)
 */
export function detectCurrentMeal(now = new Date()): MealType {
  const hour = now.getHours();
  const minute = now.getMinutes();
  const time = hour + minute / 60;

  if (time >= 5 && time < 10.5) return 'breakfast';
  if (time >= 10.5 && time < 14) return 'lunch';
  if (time >= 14 && time < 17.5) return 'afternoon';
  if (time >= 17.5 && time < 22) return 'dinner';
  return 'latenight';
}

export function isMealType(val: unknown): val is MealType {
  return val === 'breakfast' || val === 'lunch' || val === 'afternoon' || val === 'dinner' || val === 'latenight';
}
