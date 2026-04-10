import React from 'react';

interface Row {
  [key: string]: string | number | null;
}

interface NutritionTableProps {
  title: string;
  columns: string[];
  data: Row[];
  className?: string;
}

const keyMap: { [key: string]: string | undefined } = {
  "Item": "item",
  "Calories": "calories",
  "Total Fat (g)": "total_fat_g",
  "Sat. Fat (g)": "saturated_fat_g",
  "Chol. (mg)": "cholesterol_mg",
  "Sodium (mg)": "sodium_mg",
  "Carbs (g)": "total_carbohydrates_g",
  "Fiber (g)": "dietary_fiber_g",
  "Sugars (g)": "sugars_g",
  "Protein (g)": "protein_g"
};

export default function NutritionTable({ title, columns, data, className = '' }: NutritionTableProps) {
  return (
    <div className={`${className}`}>
      <div className="bg-white rounded-[2rem] shadow-sm border border-black/5 overflow-hidden">
        <div className="px-6 py-5 border-b border-black/5 bg-gray-50/50">
          <h3 className="text-lg font-black italic tracking-tighter text-gray-900 uppercase">{title}</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-gray-50/30">
                {columns.map((col, i) => (
                  <th key={i} className="px-6 py-4 text-[9px] font-black uppercase tracking-[0.2em] text-gray-400 border-b border-black/5 whitespace-nowrap">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {data.map((row, rowIndex) => (
                <tr key={rowIndex} className="group hover:bg-primary/5 transition-colors duration-200">
                  {columns.map((col, colIndex) => {
                    const key = keyMap[col] || col.toLowerCase();
                    const value = row[key];
                    return (
                      <td key={colIndex} className={`px-6 py-4 text-xs font-bold tracking-tight text-gray-700 ${colIndex === 0 ? 'text-gray-900 sticky left-0 bg-white group-hover:bg-primary/5 z-10' : ''}`}>
                        {value === null || value === undefined ? '-' : value}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
