export const ALLERGEN_KEYS = ['wheat', 'dairy', 'egg', 'soy', 'fish_shellfish', 'mustard', 'celery'] as const;
export type AllergenKey = typeof ALLERGEN_KEYS[number];

export interface AllergenItem {
  name: string;
  lto: boolean;
  allergens: Record<AllergenKey, boolean>;
}

export interface AllergenCategory {
  id: string;
  name: string;
  items: AllergenItem[];
}

export const ALLERGEN_CATALOGUE: AllergenCategory[] = [
  {
    id: 'classic', name: 'Classic Wings',
    items: [
      { name: 'Atomic',             lto: false, allergens: { wheat: false, dairy: false, egg: false, soy: true,  fish_shellfish: false, mustard: false, celery: false } },
      { name: 'Cajun',              lto: false, allergens: { wheat: false, dairy: false, egg: false, soy: true,  fish_shellfish: false, mustard: false, celery: false } },
      { name: 'Garlic Parmesan',    lto: false, allergens: { wheat: false, dairy: true,  egg: false, soy: true,  fish_shellfish: false, mustard: false, celery: false } },
      { name: 'Hawaiian',           lto: false, allergens: { wheat: true,  dairy: false, egg: false, soy: true,  fish_shellfish: false, mustard: false, celery: false } },
      { name: 'Hickory Smoked BBQ', lto: false, allergens: { wheat: false, dairy: false, egg: false, soy: true,  fish_shellfish: false, mustard: false, celery: false } },
      { name: 'Hot Honey Rub',      lto: false, allergens: { wheat: true,  dairy: false, egg: false, soy: true,  fish_shellfish: false, mustard: false, celery: false } },
      { name: 'Lemon Pepper',       lto: false, allergens: { wheat: false, dairy: false, egg: false, soy: true,  fish_shellfish: false, mustard: false, celery: true  } },
      { name: 'Louisiana Rub',      lto: false, allergens: { wheat: false, dairy: false, egg: false, soy: true,  fish_shellfish: false, mustard: false, celery: false } },
      { name: 'Mango Habanero',     lto: false, allergens: { wheat: false, dairy: false, egg: false, soy: true,  fish_shellfish: false, mustard: false, celery: false } },
      { name: 'Mild',               lto: false, allergens: { wheat: false, dairy: false, egg: false, soy: true,  fish_shellfish: false, mustard: true,  celery: false } },
      { name: 'Original Hot',       lto: false, allergens: { wheat: true,  dairy: false, egg: false, soy: true,  fish_shellfish: false, mustard: false, celery: false } },
      { name: 'Plain',              lto: false, allergens: { wheat: false, dairy: false, egg: false, soy: false, fish_shellfish: false, mustard: false, celery: false } },
      { name: 'Spicy Korean Q',     lto: false, allergens: { wheat: true,  dairy: false, egg: false, soy: true,  fish_shellfish: false, mustard: false, celery: false } },
      { name: 'Citrus Mojo',        lto: true,  allergens: { wheat: false, dairy: false, egg: false, soy: false, fish_shellfish: false, mustard: true,  celery: false } },
      { name: '420 Fiery Nacho',    lto: true,  allergens: { wheat: false, dairy: true,  egg: false, soy: true,  fish_shellfish: false, mustard: false, celery: false } },
    ],
  },
  {
    id: 'boneless_wings', name: 'Boneless Wings',
    items: [
      { name: 'Atomic',             lto: false, allergens: { wheat: true,  dairy: false, egg: false, soy: true,  fish_shellfish: false, mustard: false, celery: false } },
      { name: 'Cajun',              lto: false, allergens: { wheat: true,  dairy: false, egg: false, soy: true,  fish_shellfish: false, mustard: false, celery: false } },
      { name: 'Garlic Parmesan',    lto: false, allergens: { wheat: true,  dairy: true,  egg: false, soy: true,  fish_shellfish: false, mustard: false, celery: false } },
      { name: 'Hawaiian',           lto: false, allergens: { wheat: true,  dairy: false, egg: false, soy: true,  fish_shellfish: false, mustard: false, celery: false } },
      { name: 'Hickory Smoked BBQ', lto: false, allergens: { wheat: true,  dairy: false, egg: false, soy: true,  fish_shellfish: false, mustard: false, celery: false } },
      { name: 'Hot Honey Rub',      lto: false, allergens: { wheat: true,  dairy: false, egg: false, soy: true,  fish_shellfish: false, mustard: false, celery: false } },
      { name: 'Lemon Pepper',       lto: false, allergens: { wheat: true,  dairy: false, egg: false, soy: true,  fish_shellfish: false, mustard: false, celery: true  } },
      { name: 'Louisiana Rub',      lto: false, allergens: { wheat: true,  dairy: false, egg: false, soy: true,  fish_shellfish: false, mustard: false, celery: false } },
      { name: 'Mango Habanero',     lto: false, allergens: { wheat: true,  dairy: false, egg: false, soy: true,  fish_shellfish: false, mustard: false, celery: false } },
      { name: 'Mild',               lto: false, allergens: { wheat: true,  dairy: false, egg: false, soy: true,  fish_shellfish: false, mustard: true,  celery: false } },
      { name: 'Original Hot',       lto: false, allergens: { wheat: true,  dairy: false, egg: false, soy: true,  fish_shellfish: false, mustard: false, celery: false } },
      { name: 'Plain',              lto: false, allergens: { wheat: true,  dairy: false, egg: false, soy: false, fish_shellfish: false, mustard: false, celery: false } },
      { name: 'Spicy Korean Q',     lto: false, allergens: { wheat: true,  dairy: false, egg: false, soy: true,  fish_shellfish: false, mustard: false, celery: false } },
      { name: 'Citrus Mojo',        lto: true,  allergens: { wheat: true,  dairy: false, egg: false, soy: false, fish_shellfish: false, mustard: true,  celery: false } },
      { name: '420 Fiery Nacho',    lto: true,  allergens: { wheat: true,  dairy: true,  egg: false, soy: true,  fish_shellfish: false, mustard: false, celery: false } },
    ],
  },
  {
    id: 'chicken_tenders', name: 'Chicken Tenders',
    items: [
      { name: 'Atomic',             lto: false, allergens: { wheat: true,  dairy: false, egg: false, soy: true,  fish_shellfish: false, mustard: false, celery: false } },
      { name: 'Cajun',              lto: false, allergens: { wheat: true,  dairy: false, egg: false, soy: true,  fish_shellfish: false, mustard: false, celery: false } },
      { name: 'Garlic Parmesan',    lto: false, allergens: { wheat: true,  dairy: true,  egg: false, soy: true,  fish_shellfish: false, mustard: false, celery: false } },
      { name: 'Hawaiian',           lto: false, allergens: { wheat: true,  dairy: false, egg: false, soy: true,  fish_shellfish: false, mustard: false, celery: false } },
      { name: 'Hickory Smoked BBQ', lto: false, allergens: { wheat: true,  dairy: false, egg: false, soy: true,  fish_shellfish: false, mustard: false, celery: false } },
      { name: 'Hot Honey Rub',      lto: false, allergens: { wheat: true,  dairy: false, egg: false, soy: true,  fish_shellfish: false, mustard: false, celery: false } },
      { name: 'Lemon Pepper',       lto: false, allergens: { wheat: true,  dairy: false, egg: false, soy: true,  fish_shellfish: false, mustard: false, celery: true  } },
      { name: 'Louisiana Rub',      lto: false, allergens: { wheat: true,  dairy: false, egg: false, soy: true,  fish_shellfish: false, mustard: false, celery: false } },
      { name: 'Mango Habanero',     lto: false, allergens: { wheat: true,  dairy: false, egg: false, soy: true,  fish_shellfish: false, mustard: false, celery: false } },
      { name: 'Mild',               lto: false, allergens: { wheat: true,  dairy: false, egg: false, soy: true,  fish_shellfish: false, mustard: true,  celery: false } },
      { name: 'Original Hot',       lto: false, allergens: { wheat: true,  dairy: false, egg: false, soy: true,  fish_shellfish: false, mustard: false, celery: false } },
      { name: 'Plain',              lto: false, allergens: { wheat: true,  dairy: false, egg: false, soy: false, fish_shellfish: false, mustard: false, celery: false } },
      { name: 'Spicy Korean Q',     lto: false, allergens: { wheat: true,  dairy: false, egg: false, soy: true,  fish_shellfish: false, mustard: false, celery: false } },
      { name: 'Citrus Mojo',        lto: true,  allergens: { wheat: true,  dairy: false, egg: false, soy: false, fish_shellfish: false, mustard: true,  celery: false } },
      { name: '420 Fiery Nacho',    lto: true,  allergens: { wheat: true,  dairy: true,  egg: false, soy: true,  fish_shellfish: false, mustard: false, celery: false } },
    ],
  },
  {
    id: 'chicken_sandwich', name: 'Chicken Sandwich',
    items: [
      { name: 'Atomic',             lto: false, allergens: { wheat: true,  dairy: false, egg: false, soy: true,  fish_shellfish: false, mustard: false, celery: false } },
      { name: 'Cajun',              lto: false, allergens: { wheat: true,  dairy: false, egg: false, soy: true,  fish_shellfish: false, mustard: false, celery: false } },
      { name: 'Garlic Parmesan',    lto: false, allergens: { wheat: true,  dairy: true,  egg: false, soy: true,  fish_shellfish: false, mustard: false, celery: false } },
      { name: 'Hawaiian',           lto: false, allergens: { wheat: true,  dairy: false, egg: false, soy: true,  fish_shellfish: false, mustard: false, celery: false } },
      { name: 'Hickory Smoked BBQ', lto: false, allergens: { wheat: true,  dairy: false, egg: false, soy: true,  fish_shellfish: false, mustard: false, celery: false } },
      { name: 'Hot Honey Rub',      lto: false, allergens: { wheat: true,  dairy: false, egg: false, soy: true,  fish_shellfish: false, mustard: false, celery: false } },
      { name: 'Lemon Pepper',       lto: false, allergens: { wheat: true,  dairy: false, egg: false, soy: true,  fish_shellfish: false, mustard: false, celery: true  } },
      { name: 'Louisiana Rub',      lto: false, allergens: { wheat: true,  dairy: false, egg: false, soy: true,  fish_shellfish: false, mustard: false, celery: false } },
      { name: 'Mango Habanero',     lto: false, allergens: { wheat: true,  dairy: false, egg: false, soy: true,  fish_shellfish: false, mustard: false, celery: false } },
      { name: 'Mild',               lto: false, allergens: { wheat: true,  dairy: false, egg: false, soy: true,  fish_shellfish: false, mustard: true,  celery: false } },
      { name: 'Original Hot',       lto: false, allergens: { wheat: true,  dairy: false, egg: false, soy: true,  fish_shellfish: false, mustard: false, celery: false } },
      { name: 'Plain',              lto: false, allergens: { wheat: true,  dairy: false, egg: false, soy: false, fish_shellfish: false, mustard: false, celery: false } },
      { name: 'Spicy Korean Q',     lto: false, allergens: { wheat: true,  dairy: false, egg: false, soy: true,  fish_shellfish: false, mustard: false, celery: false } },
      { name: 'Citrus Mojo',        lto: true,  allergens: { wheat: true,  dairy: false, egg: false, soy: false, fish_shellfish: false, mustard: true,  celery: false } },
      { name: '420 Fiery Nacho',    lto: true,  allergens: { wheat: true,  dairy: true,  egg: false, soy: true,  fish_shellfish: false, mustard: false, celery: false } },
    ],
  },
  {
    id: 'sides', name: 'Sides & Dips',
    items: [
      { name: 'Veggie Sticks Celery',   lto: false, allergens: { wheat: false, dairy: false, egg: false, soy: false, fish_shellfish: false, mustard: false, celery: false } },
      { name: 'Veggie Sticks Carrots',  lto: false, allergens: { wheat: false, dairy: false, egg: false, soy: false, fish_shellfish: false, mustard: false, celery: false } },
      { name: 'Ranch Dip',              lto: false, allergens: { wheat: false, dairy: true,  egg: true,  soy: false, fish_shellfish: false, mustard: false, celery: false } },
      { name: 'Blue Cheese Dip',        lto: false, allergens: { wheat: false, dairy: true,  egg: true,  soy: false, fish_shellfish: true,  mustard: true,  celery: false } },
      { name: 'Honey Mustard Dip',      lto: false, allergens: { wheat: false, dairy: false, egg: true,  soy: false, fish_shellfish: false, mustard: false, celery: false } },
      { name: 'Cheddar Cheese Sauce',   lto: false, allergens: { wheat: false, dairy: true,  egg: false, soy: false, fish_shellfish: false, mustard: false, celery: false } },
      { name: 'Seasoned Fries',         lto: false, allergens: { wheat: true,  dairy: false, egg: false, soy: false, fish_shellfish: false, mustard: false, celery: false } },
      { name: 'Cheese Fries',           lto: false, allergens: { wheat: true,  dairy: true,  egg: false, soy: false, fish_shellfish: false, mustard: false, celery: false } },
      { name: 'Buffalo Ranch Fries',    lto: false, allergens: { wheat: true,  dairy: true,  egg: false, soy: false, fish_shellfish: false, mustard: false, celery: false } },
      { name: 'Louisiana Voodoo Fries', lto: false, allergens: { wheat: true,  dairy: true,  egg: false, soy: false, fish_shellfish: false, mustard: false, celery: false } },
      { name: 'Lemon Pepper Fries',     lto: false, allergens: { wheat: true,  dairy: false, egg: false, soy: false, fish_shellfish: false, mustard: false, celery: false } },
      { name: 'Parmesan Fries',         lto: false, allergens: { wheat: true,  dairy: true,  egg: false, soy: false, fish_shellfish: false, mustard: false, celery: false } },
      { name: 'Hot Honey Fries',        lto: false, allergens: { wheat: true,  dairy: false, egg: false, soy: false, fish_shellfish: false, mustard: false, celery: false } },
      { name: 'Seasoned Fried Corn',    lto: false, allergens: { wheat: false, dairy: false, egg: false, soy: false, fish_shellfish: false, mustard: false, celery: false } },
      { name: 'Brownie',                lto: false, allergens: { wheat: true,  dairy: true,  egg: false, soy: false, fish_shellfish: false, mustard: false, celery: false } },
    ],
  },
];

export const getAllergensByProductName = (name: string): AllergenItem | undefined => {
  const normalizedSearch = name.toLowerCase();
  
  // 1. Direct Match Check
  for (const category of ALLERGEN_CATALOGUE) {
    const found = category.items.find(item => {
      const itemLower = item.name.toLowerCase();
      return normalizedSearch.includes(itemLower) || itemLower.includes(normalizedSearch);
    });
    if (found) return found;
  }

  // 2. Keyword/Category Fallback (for Bundles/Combos)
  const fallbacks: Record<string, string> = {
    'boneless': 'boneless_wings',
    'classic': 'classic',
    'tender': 'chicken_tenders',
    'sandwich': 'chicken_sandwich',
    'fries': 'sides',
    'corn': 'sides',
    'brownie': 'sides'
  };

  for (const [keyword, categoryId] of Object.entries(fallbacks)) {
    if (normalizedSearch.includes(keyword)) {
      const category = ALLERGEN_CATALOGUE.find(c => c.id === categoryId);
      if (category) {
        // Return a generic match for the category (e.g., 'Plain' or the first item)
        return category.items.find(i => i.name === 'Plain') || category.items[0];
      }
    }
  }

  return undefined;
};
