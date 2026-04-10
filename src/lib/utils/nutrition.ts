import { menuItems } from '../data/menu';

export function calculateNutrition(count: number, sauceSlug: string) {
  // Find the base item in the new menuItems list
  // SauceSlug comes in like 'bbq' or 'lemon-pepper'
  // In menu.ts, names are 'Classic Wings - Hickory Smoked BBQ' etc.
  
  const flavorMap: Record<string, string> = {
    'bbq': 'Hickory Smoked BBQ',
    'lemon-pepper': 'Lemon Pepper',
    'mango-habanero': 'Mango Habanero',
    'garlic-parmesan': 'Garlic Parmesan',
    'atomic': 'Atomic',
    'cajun': 'Cajun',
    'original-hot': 'Original Hot',
    'mild': 'Mild',
    'plain': 'Plain'
  };

  const flavorName = flavorMap[sauceSlug] || 'Plain';
  const item = menuItems.find(i => i.name === `Classic Wings - ${flavorName}`);

  if (!item) {
    // Fallback to approximate calculation if not found
    const base = { calories: 90, protein: 10, carbs: 0, fat: 5 };
    return {
      calories: base.calories * count,
      protein: base.protein * count,
      carbs: base.carbs * count,
      fat: base.fat * count,
    };
  }

  return {
    calories: (item.calories || 0) * count,
    protein: (item.protein || 0) * count,
    carbs: (item.carbs || 0) * count,
    fat: (item.fat || 0) * count,
    sodium: (item.sodium || 0) * count,
    fiber: (item.fiber || 0) * count,
    sugars: (item.sugars || 0) * count,
  };
}
