import { wingCounts, sauces, categories } from '../data/programmatic';

export function parseSlug(slug: string) {
  const parts = slug.split('-');
  let count: number | null = null;
  let sauce: string | null = null;
  let category: string | null = null;

  for (const part of parts) {
    const num = parseInt(part);
    if (wingCounts.includes(num)) {
      count = num;
    } else if (sauces.includes(part)) {
      sauce = part;
    } else if (categories.includes(part)) {
      category = part;
    }
  }

  return { count, sauce, category };
}
