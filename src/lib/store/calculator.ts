import { create } from 'zustand';
import { MenuItem } from '../data/menu';

interface CalculatorState {
  selectedItems: { item: MenuItem; quantity: number }[];
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
  totalSaturatedFat: number;
  totalSodium: number;
  totalSugars: number;
  totalFiber: number;
  addItem: (item: MenuItem) => void;
  removeItem: (id: string) => void;
  clearItems: () => void;
}

const calculateTotals = (selectedItems: { item: MenuItem; quantity: number }[]) => {
  let totalCalories = 0;
  let totalProtein = 0;
  let totalCarbs = 0;
  let totalFat = 0;
  let totalSaturatedFat = 0;
  let totalSodium = 0;
  let totalSugars = 0;
  let totalFiber = 0;

  selectedItems.forEach(si => {
    const q = si.quantity;
    totalCalories += (si.item.calories || 0) * q;
    totalProtein += (si.item.protein || 0) * q;
    totalCarbs += (si.item.carbs || 0) * q;
    totalFat += (si.item.fat || 0) * q;
    totalSaturatedFat += (si.item.saturatedFat || 0) * q;
    totalSodium += (si.item.sodium || 0) * q;
    totalSugars += (si.item.sugars || 0) * q;
    totalFiber += (si.item.fiber || 0) * q;
  });

  return { 
    totalCalories, 
    totalProtein, 
    totalCarbs, 
    totalFat,
    totalSaturatedFat,
    totalSodium,
    totalSugars,
    totalFiber
  };
};

export const useCalculatorStore = create<CalculatorState>((set) => ({
  selectedItems: [],
  totalCalories: 0,
  totalProtein: 0,
  totalCarbs: 0,
  totalFat: 0,
  totalSaturatedFat: 0,
  totalSodium: 0,
  totalSugars: 0,
  totalFiber: 0,

  addItem: (item: MenuItem) => {
    set(state => {
      const existing = state.selectedItems.find(si => si.item.id === item.id);
      let newSelectedItems;
      if (existing) {
        newSelectedItems = state.selectedItems.map(si =>
          si.item.id === item.id ? { ...si, quantity: si.quantity + 1 } : si
        );
      } else {
        newSelectedItems = [...state.selectedItems, { item, quantity: 1 }];
      }
      const totals = calculateTotals(newSelectedItems);
      return { selectedItems: newSelectedItems, ...totals };
    });
  },

  removeItem: (id: string) => {
    set(state => {
      const newSelectedItems = state.selectedItems
        .map(si => si.item.id === id ? { ...si, quantity: si.quantity - 1 } : si)
        .filter(si => si.quantity > 0);
      const totals = calculateTotals(newSelectedItems);
      return { selectedItems: newSelectedItems, ...totals };
    });
  },

  clearItems: () => {
    set({ 
      selectedItems: [], 
      totalCalories: 0, 
      totalProtein: 0, 
      totalCarbs: 0, 
      totalFat: 0,
      totalSaturatedFat: 0,
      totalSodium: 0,
      totalSugars: 0,
      totalFiber: 0
    });
  },
}));
