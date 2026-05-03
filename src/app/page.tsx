import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import NutritionTable from '@/components/NutritionTable';
import FAQAccordion from '@/components/FAQAccordion';
import HomeClient from '@/components/HomeClient';
import {
  ShieldCheck, Zap, Target, Flame,
  TrendingUp, ChevronRight, Star, Award,
  Users, Calculator as CalcIcon, ArrowRight,
  Utensils, MapPin, Leaf, AlertTriangle,
  Package, Beef, Dumbbell, AlertCircle
} from 'lucide-react';

// ── SEO Metadata ───────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: 'Wingstop Nutrition Calculator | Check Calories & Macros',
  description: 'Use the Wingstop nutrition calculator to check calories, macros, and full menu nutrition facts for your favorite wings and sides.',
  alternates: { canonical: 'https://wingstopcaloriecalculator.us' },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Wingstop Nutrition Calculator – Calories & Macros for Every Item',
    description: 'Track your Wingstop calories and macros instantly. Set your daily goal, see burn equivalents, and build your perfect meal.',
    type: 'website',
    url: 'https://wingstopcaloriecalculator.us',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wingstop Nutrition Calculator',
    description: 'Instant calorie and macro tracking for every Wingstop menu item.',
  },
};

// ─── Static Data ──────────────────────────────────────────────────────────────

const NUTRITION_COLUMNS = [
  "Item", "Calories", "Total Fat (g)", "Sat. Fat (g)", "Chol. (mg)", "Sodium (mg)", "Carbs (g)", "Fiber (g)", "Sugars (g)", "Protein (g)"
];

const FULL_NUTRITION_DATA = {
  "Classic (Bone-In) Wings": [
    { "item": "Atomic", "calories": 90, "total_fat_g": 5, "saturated_fat_g": 1.5, "cholesterol_mg": 45, "sodium_mg": 220, "total_carbohydrates_g": 1, "dietary_fiber_g": 0, "sugars_g": 0, "protein_g": 10 },
    { "item": "Cajun", "calories": 90, "total_fat_g": 5, "saturated_fat_g": 1.5, "cholesterol_mg": 45, "sodium_mg": 310, "total_carbohydrates_g": 0, "dietary_fiber_g": 0, "sugars_g": 0, "protein_g": 10 },
    { "item": "Garlic Parm", "calories": 120, "total_fat_g": 8, "saturated_fat_g": 2, "cholesterol_mg": 45, "sodium_mg": 75, "total_carbohydrates_g": 1, "dietary_fiber_g": 0, "sugars_g": 0, "protein_g": 10 },
    { "item": "Hawaiian", "calories": 100, "total_fat_g": 5, "saturated_fat_g": 1.5, "cholesterol_mg": 45, "sodium_mg": 85, "total_carbohydrates_g": 3, "dietary_fiber_g": 0, "sugars_g": 2, "protein_g": 10 },
    { "item": "Hickory Smoked BBQ", "calories": 100, "total_fat_g": 5, "saturated_fat_g": 1.5, "cholesterol_mg": 45, "sodium_mg": 150, "total_carbohydrates_g": 4, "dietary_fiber_g": 0, "sugars_g": 3, "protein_g": 10 },
    { "item": "Lemon Pepper", "calories": 120, "total_fat_g": 8, "saturated_fat_g": 2, "cholesterol_mg": 45, "sodium_mg": 210, "total_carbohydrates_g": 0, "dietary_fiber_g": 0, "sugars_g": 0, "protein_g": 10 },
    { "item": "Louisiana Rub", "calories": 110, "total_fat_g": 7, "saturated_fat_g": 2, "cholesterol_mg": 45, "sodium_mg": 140, "total_carbohydrates_g": 0, "dietary_fiber_g": 0, "sugars_g": 0, "protein_g": 10 },
    { "item": "Mango Habanero", "calories": 100, "total_fat_g": 5, "saturated_fat_g": 1.5, "cholesterol_mg": 45, "sodium_mg": 80, "total_carbohydrates_g": 4, "dietary_fiber_g": 0, "sugars_g": 3, "protein_g": 10 },
    { "item": "Mild", "calories": 120, "total_fat_g": 8, "saturated_fat_g": 2, "cholesterol_mg": 45, "sodium_mg": 160, "total_carbohydrates_g": 0, "dietary_fiber_g": 0, "sugars_g": 0, "protein_g": 10 },
    { "item": "Old Bay", "calories": 100, "total_fat_g": 7, "saturated_fat_g": 2, "cholesterol_mg": 45, "sodium_mg": 110, "total_carbohydrates_g": 0, "dietary_fiber_g": 0, "sugars_g": 1, "protein_g": 10 },
    { "item": "Original Hot", "calories": 90, "total_fat_g": 5, "saturated_fat_g": 1.5, "cholesterol_mg": 45, "sodium_mg": 230, "total_carbohydrates_g": 0, "dietary_fiber_g": 0, "sugars_g": 0, "protein_g": 10 },
    { "item": "Plain", "calories": 90, "total_fat_g": 5, "saturated_fat_g": 1.5, "cholesterol_mg": 45, "sodium_mg": 30, "total_carbohydrates_g": 0, "dietary_fiber_g": 0, "sugars_g": 0, "protein_g": 10 },
    { "item": "Spicy Korean Q", "calories": 100, "total_fat_g": 5, "saturated_fat_g": 1.5, "cholesterol_mg": 45, "sodium_mg": 135, "total_carbohydrates_g": 3, "dietary_fiber_g": 0, "sugars_g": 3, "protein_g": 10 }
  ],
  "Boneless Wings": [
    { "item": "Atomic", "calories": 90, "total_fat_g": 4.5, "saturated_fat_g": 1, "cholesterol_mg": 10, "sodium_mg": 380, "total_carbohydrates_g": 7, "dietary_fiber_g": 0, "sugars_g": 0, "protein_g": 4 },
    { "item": "Cajun", "calories": 80, "total_fat_g": 4.5, "saturated_fat_g": 1, "cholesterol_mg": 10, "sodium_mg": 450, "total_carbohydrates_g": 6, "dietary_fiber_g": 0, "sugars_g": 0, "protein_g": 4 },
    { "item": "Garlic Parm", "calories": 110, "total_fat_g": 7, "saturated_fat_g": 1.5, "cholesterol_mg": 15, "sodium_mg": 260, "total_carbohydrates_g": 6, "dietary_fiber_g": 0, "sugars_g": 0, "protein_g": 4 },
    { "item": "Hawaiian", "calories": 90, "total_fat_g": 4.5, "saturated_fat_g": 1, "cholesterol_mg": 10, "sodium_mg": 270, "total_carbohydrates_g": 8, "dietary_fiber_g": 0, "sugars_g": 2, "protein_g": 4 },
    { "item": "Hickory Smoked BBQ", "calories": 90, "total_fat_g": 4.5, "saturated_fat_g": 1, "cholesterol_mg": 10, "sodium_mg": 330, "total_carbohydrates_g": 9, "dietary_fiber_g": 0, "sugars_g": 3, "protein_g": 5 },
    { "item": "Lemon Pepper", "calories": 110, "total_fat_g": 7, "saturated_fat_g": 1.5, "cholesterol_mg": 10, "sodium_mg": 290, "total_carbohydrates_g": 6, "dietary_fiber_g": 0, "sugars_g": 0, "protein_g": 4 },
    { "item": "Louisiana Rub", "calories": 100, "total_fat_g": 6, "saturated_fat_g": 1, "cholesterol_mg": 10, "sodium_mg": 260, "total_carbohydrates_g": 6, "dietary_fiber_g": 0, "sugars_g": 0, "protein_g": 4 },
    { "item": "Mango Habanero", "calories": 90, "total_fat_g": 4.5, "saturated_fat_g": 1, "cholesterol_mg": 10, "sodium_mg": 270, "total_carbohydrates_g": 9, "dietary_fiber_g": 0, "sugars_g": 3, "protein_g": 4 },
    { "item": "Mild", "calories": 110, "total_fat_g": 7, "saturated_fat_g": 1.5, "cholesterol_mg": 10, "sodium_mg": 330, "total_carbohydrates_g": 6, "dietary_fiber_g": 0, "sugars_g": 0, "protein_g": 4 },
    { "item": "Old Bay", "calories": 100, "total_fat_g": 6, "saturated_fat_g": 1, "cholesterol_mg": 10, "sodium_mg": 290, "total_carbohydrates_g": 6, "dietary_fiber_g": 0, "sugars_g": 1, "protein_g": 4 },
    { "item": "Original Hot", "calories": 80, "total_fat_g": 4.5, "saturated_fat_g": 1, "cholesterol_mg": 10, "sodium_mg": 390, "total_carbohydrates_g": 6, "dietary_fiber_g": 0, "sugars_g": 0, "protein_g": 4 },
    { "item": "Plain", "calories": 80, "total_fat_g": 4.5, "saturated_fat_g": 1, "cholesterol_mg": 10, "sodium_mg": 230, "total_carbohydrates_g": 6, "dietary_fiber_g": 0, "sugars_g": 0, "protein_g": 4 },
    { "item": "Spicy Korean Q", "calories": 90, "total_fat_g": 4.5, "saturated_fat_g": 1, "cholesterol_mg": 10, "sodium_mg": 320, "total_carbohydrates_g": 8, "dietary_fiber_g": 0, "sugars_g": 2, "protein_g": 5 }
  ],
  "Boneless Tenders": [
    { "item": "Atomic", "calories": 150, "total_fat_g": 7, "saturated_fat_g": 1, "cholesterol_mg": 30, "sodium_mg": 850, "total_carbohydrates_g": 12, "dietary_fiber_g": 0, "sugars_g": 0, "protein_g": 10 },
    { "item": "Cajun", "calories": 150, "total_fat_g": 7, "saturated_fat_g": 1, "cholesterol_mg": 30, "sodium_mg": 1020, "total_carbohydrates_g": 11, "dietary_fiber_g": 0, "sugars_g": 0, "protein_g": 10 },
    { "item": "Garlic Parm", "calories": 210, "total_fat_g": 14, "saturated_fat_g": 2.5, "cholesterol_mg": 30, "sodium_mg": 550, "total_carbohydrates_g": 11, "dietary_fiber_g": 0, "sugars_g": 0, "protein_g": 10 },
    { "item": "Hawaiian", "calories": 160, "total_fat_g": 7, "saturated_fat_g": 1, "cholesterol_mg": 30, "sodium_mg": 580, "total_carbohydrates_g": 16, "dietary_fiber_g": 0, "sugars_g": 5, "protein_g": 10 },
    { "item": "Hickory Smoked BBQ", "calories": 170, "total_fat_g": 7, "saturated_fat_g": 1, "cholesterol_mg": 30, "sodium_mg": 710, "total_carbohydrates_g": 17, "dietary_fiber_g": 0, "sugars_g": 6, "protein_g": 10 },
    { "item": "Lemon Pepper", "calories": 200, "total_fat_g": 13, "saturated_fat_g": 2.5, "cholesterol_mg": 30, "sodium_mg": 620, "total_carbohydrates_g": 10, "dietary_fiber_g": 0, "sugars_g": 0, "protein_g": 10 },
    { "item": "Louisiana Rub", "calories": 180, "total_fat_g": 12, "saturated_fat_g": 2, "cholesterol_mg": 30, "sodium_mg": 540, "total_carbohydrates_g": 10, "dietary_fiber_g": 0, "sugars_g": 0, "protein_g": 10 },
    { "item": "Mango Habanero", "calories": 170, "total_fat_g": 7, "saturated_fat_g": 1, "cholesterol_mg": 30, "sodium_mg": 570, "total_carbohydrates_g": 17, "dietary_fiber_g": 0, "sugars_g": 7, "protein_g": 10 },
    { "item": "Mild", "calories": 200, "total_fat_g": 14, "saturated_fat_g": 2.5, "cholesterol_mg": 30, "sodium_mg": 730, "total_carbohydrates_g": 10, "dietary_fiber_g": 0, "sugars_g": 0, "protein_g": 10 },
    { "item": "Old Bay", "calories": 170, "total_fat_g": 11, "saturated_fat_g": 2, "cholesterol_mg": 30, "sodium_mg": 420, "total_carbohydrates_g": 10, "dietary_fiber_g": 0, "sugars_g": 2, "protein_g": 10 },
    { "item": "Original Hot", "calories": 140, "total_fat_g": 7, "saturated_fat_g": 1, "cholesterol_mg": 30, "sodium_mg": 870, "total_carbohydrates_g": 10, "dietary_fiber_g": 0, "sugars_g": 0, "protein_g": 10 },
    { "item": "Plain", "calories": 140, "total_fat_g": 7, "saturated_fat_g": 1, "cholesterol_mg": 30, "sodium_mg": 470, "total_carbohydrates_g": 10, "dietary_fiber_g": 0, "sugars_g": 0, "protein_g": 10 },
    { "item": "Spicy Korean Q", "calories": 170, "total_fat_g": 7, "saturated_fat_g": 1, "cholesterol_mg": 30, "sodium_mg": 680, "total_carbohydrates_g": 16, "dietary_fiber_g": 0, "sugars_g": 6, "protein_g": 10 }
  ],
  "Chicken Sandwich": [
    { "item": "Atomic", "calories": 650, "total_fat_g": 24, "saturated_fat_g": 4.5, "cholesterol_mg": 80, "sodium_mg": 3230, "total_carbohydrates_g": 74, "dietary_fiber_g": 2, "sugars_g": 11, "protein_g": 33 },
    { "item": "Cajun", "calories": 640, "total_fat_g": 25, "saturated_fat_g": 4.5, "cholesterol_mg": 80, "sodium_mg": 3940, "total_carbohydrates_g": 70, "dietary_fiber_g": 2, "sugars_g": 11, "protein_g": 33 },
    { "item": "Garlic Parmesan", "calories": 890, "total_fat_g": 52, "saturated_fat_g": 10, "cholesterol_mg": 80, "sodium_mg": 2060, "total_carbohydrates_g": 71, "dietary_fiber_g": 2, "sugars_g": 11, "protein_g": 34 },
    { "item": "Hawaiian", "calories": 710, "total_fat_g": 24, "saturated_fat_g": 4.5, "cholesterol_mg": 80, "sodium_mg": 2150, "total_carbohydrates_g": 90, "dietary_fiber_g": 2, "sugars_g": 30, "protein_g": 33 },
    { "item": "Hickory Smoked BBQ", "calories": 730, "total_fat_g": 24, "saturated_fat_g": 4.5, "cholesterol_mg": 80, "sodium_mg": 2680, "total_carbohydrates_g": 96, "dietary_fiber_g": 2, "sugars_g": 36, "protein_g": 34 },
    { "item": "Lemon Pepper", "calories": 850, "total_fat_g": 50, "saturated_fat_g": 9, "cholesterol_mg": 80, "sodium_mg": 2320, "total_carbohydrates_g": 67, "dietary_fiber_g": 2, "sugars_g": 10, "protein_g": 32 },
    { "item": "Louisiana Rub", "calories": 790, "total_fat_g": 43, "saturated_fat_g": 8, "cholesterol_mg": 80, "sodium_mg": 2020, "total_carbohydrates_g": 67, "dietary_fiber_g": 2, "sugars_g": 10, "protein_g": 32 },
    { "item": "Mango Habanero", "calories": 740, "total_fat_g": 24, "saturated_fat_g": 4.5, "cholesterol_mg": 80, "sodium_mg": 2120, "total_carbohydrates_g": 94, "dietary_fiber_g": 2, "sugars_g": 7, "protein_g": 32 },
    { "item": "Mild", "calories": 870, "total_fat_g": 52, "saturated_fat_g": 10, "cholesterol_mg": 80, "sodium_mg": 2750, "total_carbohydrates_g": 67, "dietary_fiber_g": 2, "sugars_g": 10, "protein_g": 32 },
    { "item": "Original Hot", "calories": 630, "total_fat_g": 25, "saturated_fat_g": 4.5, "cholesterol_mg": 80, "sodium_mg": 3340, "total_carbohydrates_g": 68, "dietary_fiber_g": 2, "sugars_g": 10, "protein_g": 32 },
    { "item": "Plain", "calories": 610, "total_fat_g": 24, "saturated_fat_g": 4.5, "cholesterol_mg": 80, "sodium_mg": 1720, "total_carbohydrates_g": 66, "dietary_fiber_g": 2, "sugars_g": 10, "protein_g": 32 },
    { "item": "Spicy Korean Q", "calories": 720, "total_fat_g": 24, "saturated_fat_g": 4.5, "cholesterol_mg": 80, "sodium_mg": 2570, "total_carbohydrates_g": 90, "dietary_fiber_g": 2, "sugars_g": 32, "protein_g": 34 }
  ],
  "Sides": [
    { "item": "Blue Cheese Dip", "calories": 330, "total_fat_g": 33, "saturated_fat_g": 7, "cholesterol_mg": 40, "sodium_mg": 570, "total_carbohydrates_g": 4, "dietary_fiber_g": 0, "sugars_g": 2, "protein_g": 4 },
    { "item": "Brownie", "calories": 430, "total_fat_g": 24, "saturated_fat_g": 10, "cholesterol_mg": 85, "sodium_mg": 160, "total_carbohydrates_g": 49, "dietary_fiber_g": 3, "sugars_g": 33, "protein_g": 6 },
    { "item": "Buffalo Ranch Fries Large", "calories": 1070, "total_fat_g": 55, "saturated_fat_g": 9, "cholesterol_mg": 20, "sodium_mg": 2710, "total_carbohydrates_g": 129, "dietary_fiber_g": 0, "sugars_g": 8, "protein_g": 15 },
    { "item": "Buffalo Ranch Fries Regular", "calories": 610, "total_fat_g": 32, "saturated_fat_g": 6, "cholesterol_mg": 10, "sodium_mg": 1720, "total_carbohydrates_g": 71, "dietary_fiber_g": 0, "sugars_g": 4, "protein_g": 8 },
    { "item": "Cheese Fries Large", "calories": 1020, "total_fat_g": 47, "saturated_fat_g": 8, "cholesterol_mg": 0, "sodium_mg": 1910, "total_carbohydrates_g": 134, "dietary_fiber_g": 0, "sugars_g": 8, "protein_g": 15 },
    { "item": "Cheese Fries Regular", "calories": 580, "total_fat_g": 27, "saturated_fat_g": 5, "cholesterol_mg": 0, "sodium_mg": 1190, "total_carbohydrates_g": 75, "dietary_fiber_g": 0, "sugars_g": 4, "protein_g": 9 },
    { "item": "Fried Corn Large", "calories": 400, "total_fat_g": 18, "saturated_fat_g": 3, "cholesterol_mg": 0, "sodium_mg": 600, "total_carbohydrates_g": 48, "dietary_fiber_g": 0, "sugars_g": 19, "protein_g": 12 },
    { "item": "Fried Corn Regular", "calories": 200, "total_fat_g": 9, "saturated_fat_g": 1.5, "cholesterol_mg": 0, "sodium_mg": 300, "total_carbohydrates_g": 24, "dietary_fiber_g": 0, "sugars_g": 10, "protein_g": 6 },
    { "item": "Ranch Dip", "calories": 320, "total_fat_g": 34, "saturated_fat_g": 5, "cholesterol_mg": 35, "sodium_mg": 870, "total_carbohydrates_g": 2, "dietary_fiber_g": 0, "sugars_g": 2, "protein_g": 1 },
    { "item": "Seasoned Fries Large", "calories": 900, "total_fat_g": 37, "saturated_fat_g": 7, "cholesterol_mg": 0, "sodium_mg": 1060, "total_carbohydrates_g": 126, "dietary_fiber_g": 0, "sugars_g": 6, "protein_g": 14 },
    { "item": "Seasoned Fries Regular", "calories": 500, "total_fat_g": 21, "saturated_fat_g": 3.5, "cholesterol_mg": 0, "sodium_mg": 620, "total_carbohydrates_g": 69, "dietary_fiber_g": 0, "sugars_g": 3, "protein_g": 8 },
    { "item": "Veggie Stick Carrots", "calories": 25, "total_fat_g": 0, "saturated_fat_g": 0, "cholesterol_mg": 0, "sodium_mg": 45, "total_carbohydrates_g": 7, "dietary_fiber_g": 2, "sugars_g": 3, "protein_g": 1 },
    { "item": "Veggie Stick Celery", "calories": 10, "total_fat_g": 0, "saturated_fat_g": 0, "cholesterol_mg": 0, "sodium_mg": 45, "total_carbohydrates_g": 2, "dietary_fiber_g": 1, "sugars_g": 0, "protein_g": 1 }
  ],
  "Beverages": [
    { "item": "Coke Large", "calories": 400, "total_fat_g": 0, "saturated_fat_g": 0, "cholesterol_mg": 0, "sodium_mg": 10, "total_carbohydrates_g": 108, "dietary_fiber_g": 0, "sugars_g": 108, "protein_g": 0 },
    { "item": "Coke Regular", "calories": 250, "total_fat_g": 0, "saturated_fat_g": 0, "cholesterol_mg": 0, "sodium_mg": 5, "total_carbohydrates_g": 68, "dietary_fiber_g": 0, "sugars_g": 68, "protein_g": 0 },
    { "item": "Diet Coke Large", "calories": 0, "total_fat_g": 0, "saturated_fat_g": 0, "cholesterol_mg": 0, "sodium_mg": 40, "total_carbohydrates_g": 2, "dietary_fiber_g": 0, "sugars_g": 2, "protein_g": 0 },
    { "item": "Diet Coke Regular", "calories": 0, "total_fat_g": 0, "saturated_fat_g": 0, "cholesterol_mg": 0, "sodium_mg": 25, "total_carbohydrates_g": 1, "dietary_fiber_g": 0, "sugars_g": 1, "protein_g": 0 },
    { "item": "Sprite Large", "calories": 390, "total_fat_g": 0, "saturated_fat_g": 0, "cholesterol_mg": 0, "sodium_mg": 90, "total_carbohydrates_g": 104, "dietary_fiber_g": 0, "sugars_g": 104, "protein_g": 0 },
    { "item": "Sprite Regular", "calories": 240, "total_fat_g": 0, "saturated_fat_g": 0, "cholesterol_mg": 0, "sodium_mg": 55, "total_carbohydrates_g": 65, "dietary_fiber_g": 0, "sugars_g": 65, "protein_g": 0 }
  ]
};

const faqs = [
  { question: "How much calorie is a Wingstop 15 wings Lemon Pepper?", answer: "The total depends on whether you mean classic wings or boneless wings. That is why this question comes up so often. The easiest way to get the right answer is to choose the exact item type and portion in the calculator, because flavor and wing style both matter." },
  { question: "How many calories in Wingstop fries?", answer: "Wingstop fries can add more to the meal than people expect. A lot of users only check the wings and forget the side, which makes the final total less accurate. If you are trying to keep your order lighter, fries are one of the first things to review." },
  { question: "How many calories in Wingstop ranch?", answer: "Ranch is one of the most important extras to count. People often think of it as a small dip, but it can make a noticeable difference in the full meal. If you use ranch every time you order, it should always be included in the calculator." },
  { question: "How many calories in Wingstop boneless wings?", answer: "Boneless wings vary based on flavor and quantity, so there is no single answer that works for every order. That is why generic estimates are not very helpful. A calculator gives a better result because it matches the exact order more closely." },
  { question: "How many calories in Garlic Parmesan wings from Wingstop?", answer: "The answer depends on whether you are ordering classic wings, boneless wings, or tenders. The flavor name stays the same, but the item itself changes the nutrition profile. It is always better to check the exact menu version before ordering." },
  { question: "Are classic or boneless wings better for macros?", answer: "That depends on what you are trying to do. Some users prefer classic wings, while others prefer boneless for convenience or taste. The better move is to compare the exact items side by side and choose the one that fits your calorie and macro goal better." },
  { question: "Is Wingstop good for calorie tracking?", answer: "It can be, but only if you count the whole meal. Most mistakes happen when people only count the wings and ignore fries, ranch, or extra items. A nutrition calculator makes tracking easier because it shows the order as a complete meal." },
  { question: "Can I use this Wingstop nutrition calculator on my phone?", answer: "That is how most people will use it. A good calculator should be simple on mobile, quick to load, and easy to tap through while you are deciding what to order. If it works well on phones, it will be more useful for real users." }
];

const stats = [
  { label: 'Menu Items', target: 85, suffix: '+' },
  { label: 'Flavors', target: 13, suffix: '' },
  { label: 'Daily Users', target: 2400, suffix: '+' },
  { label: 'Accuracy %', target: 100, suffix: '%' },
];

// ─── Structured Data ──────────────────────────────────────────────────────────

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Wingstop Calorie Calculator",
  "url": "https://wingstopcaloriecalculator.us/",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://wingstopcaloriecalculator.us/menu?search={search_term_string}",
    "query-input": "required name=search_term_string"
  }
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Wingstop Nutrition Calculator",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "All",
  "url": "https://wingstopcaloriecalculator.us/",
  "description": "Calculate and track calories, macros, and nutrition facts for your Wingstop orders.",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <main className="min-h-screen bg-white font-outfit selection:bg-primary/20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([websiteSchema, softwareSchema]) }}
      />

      {/* ═══ HERO SECTION ═══ */}
      <section id="calculator-top" className="relative pt-36 pb-32 overflow-hidden bg-gradient-to-br from-[#003D20] via-[#005C30] to-[#006938] border-b-8 border-[#FDB913]">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-20 left-1/4 w-[600px] h-[600px] rounded-full bg-white/5 blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-[#FDB913]/10 blur-[100px]" />
          <div className="absolute top-1/2 left-0 w-[400px] h-[400px] rounded-full bg-emerald-400/5 blur-[100px]" />
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        </div>

        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
          <div className="max-w-5xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/10 border border-white/20 shadow-xl backdrop-blur-md mb-8 hover:bg-white/15 transition-all">
              <Star size={13} className="text-[#FDB913] fill-[#FDB913]" />
              <span className="text-[10px] font-black uppercase tracking-[0.35em] text-white/90">Official Nutri-Data 2026</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </div>

            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black text-white mb-6 tracking-tighter italic uppercase leading-[0.95] drop-shadow-2xl">
              Wingstop <span className="text-[#FDB913] relative inline-block">
                Nutrition Facts
                <span className="absolute -bottom-2 left-0 right-0 h-2 bg-[#FDB913]/30 rounded-full blur-sm" />
              </span>{' '}
              <br className="hidden sm:block" />
              <span className="text-white/90 text-5xl sm:text-6xl lg:text-7xl">&amp; Calorie Calculator</span>
            </h1>
            <p className="text-lg sm:text-xl text-white/70 font-medium leading-relaxed max-w-2xl mx-auto mb-12">
              Track your Wingstop calories and macros instantly. Set your daily goal, see burn equivalents, and build your perfect meal with absolute precision.
            </p>

            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {[
                { icon: ShieldCheck, label: 'Verified 2026 Data' },
                { icon: Zap, label: 'Real-time Totals' },
                { icon: Target, label: 'Macro Tracking' },
                { icon: Award, label: 'Keto & Diet Modes' },
              ].map((pill, i) => (
                <div key={i} className="flex items-center gap-3 px-6 py-3.5 bg-white/5 backdrop-blur-md rounded-2xl shadow-xl border border-white/10 hover:bg-white/10 hover:-translate-y-1 hover:border-white/20 transition-all cursor-default group">
                  <pill.icon size={18} className="text-[#FDB913] group-hover:scale-110 transition-transform" />
                  <span className="text-[11px] font-black uppercase tracking-widest text-white/90">{pill.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Client-side interactive section (stats + calculator) */}
          <HomeClient stats={stats} />
        </div>
      </section>

      {/* ═══ HOW IT WORKS ═══ */}
      <section className="py-28 bg-gray-50/50">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary/5 border border-primary/10 mb-6">
              <Zap size={12} className="text-primary" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary/60">Step by Step</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-gray-900 italic uppercase leading-none mb-4">Steps for the Most Accurate Calorie Count</h2>
            <p className="text-base text-gray-500 font-medium max-w-2xl mx-auto leading-relaxed">Follow these four steps for a precise Wingstop nutrition total every time.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: '01', icon: Utensils, title: 'Choose Main Item', desc: 'Start with wings, tenders, sandwich, combo, or group pack — each has different calorie profiles.', color: 'from-primary to-emerald-600' },
              { step: '02', icon: Flame, title: 'Pick a Flavor', desc: 'Lemon Pepper is 30% higher in calories than Atomic. Flavor selection matters more than you think.', color: 'from-orange-500 to-red-600' },
              { step: '03', icon: Target, title: 'Set Your Goal', desc: 'Select Standard, Keto, Bulk, or Cut mode. The calculator adjusts macro targets automatically.', color: 'from-blue-500 to-indigo-600' },
              { step: '04', icon: TrendingUp, title: 'Add Sides & Dips', desc: "Ranch alone is 320 kcal. Don't forget fries and dips — they're the silent calorie boosters.", color: 'from-rose-500 to-pink-600' },
            ].map((s, i) => (
              <div key={i} className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group relative overflow-hidden">
                <div className="absolute top-0 right-0 text-8xl font-black text-gray-50 translate-x-3 -translate-y-3 leading-none pointer-events-none select-none">{s.step}</div>
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${s.color} flex items-center justify-center text-white mb-6 shadow-lg`}>
                  <s.icon size={22} />
                </div>
                <h3 className="text-base font-black tracking-tight text-gray-900 mb-2 uppercase">{s.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed font-medium">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CALORIE INSIGHTS ═══ */}
      <section className="py-28 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary/5 border border-primary/10 mb-6">
              <Zap size={12} className="text-primary" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary/60">Nutrition Insights</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-gray-900 italic uppercase leading-none mb-4">Which Items Add the Most Calories?</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { rank: 1, title: 'Portion Size', cal: '↑ 40–80%', Icon: Package, iconColor: 'text-orange-500', bg: 'bg-orange-50', color: 'border-orange-200 bg-orange-50', text: 'Ordering 20 vs 10 wings doubles the calorie count. Always check piece count first.' },
                { rank: 2, title: 'Seasoned Fries', cal: '500 kcal', Icon: Utensils, iconColor: 'text-yellow-600', bg: 'bg-yellow-50', color: 'border-yellow-200 bg-yellow-50', text: 'A regular serving adds 500 kcal. Large adds 900 kcal. This single side can double a wing order.' },
                { rank: 3, title: 'Ranch Sauce', cal: '320 kcal', Icon: AlertCircle, iconColor: 'text-rose-500', bg: 'bg-rose-50', color: 'border-rose-200 bg-rose-50', text: 'People treat ranch as "just a dip" — but at 320 kcal per tub, it is a significant addition.' },
                { rank: 4, title: 'Boneless vs Classic', cal: '~20% diff', Icon: Beef, iconColor: 'text-emerald-600', bg: 'bg-emerald-50', color: 'border-emerald-200 bg-emerald-50', text: 'Boneless wings have more carbs from breading. Classic wings have more fat. Neither is "healthier" in all cases.' },
              ].map((item) => (
                <div key={item.rank} className={`rounded-[2rem] p-7 border-2 ${item.color} hover:-translate-y-1 hover:shadow-lg transition-all duration-300`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-11 h-11 rounded-2xl ${item.bg} border border-white flex items-center justify-center shadow-sm`}>
                      <item.Icon size={22} className={item.iconColor} />
                    </div>
                    <span className="text-[10px] font-black bg-white rounded-full px-3 py-1.5 text-gray-500 shadow-sm border">{item.cal}</span>
                  </div>
                  <h3 className="text-lg font-black text-gray-900 mb-2 uppercase tracking-tight">#{item.rank} {item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed font-medium">{item.text}</p>
                </div>
              ))}
            </div>
            <div className="space-y-6">
              <div className="bg-primary rounded-[2rem] p-8 text-white shadow-2xl shadow-primary/25 relative overflow-hidden">
                <CalcIcon size={36} className="text-secondary mb-6 relative z-10" />
                <h3 className="text-2xl font-black italic uppercase mb-4">Why a Calculator Beats a Chart</h3>
                <p className="text-white/70 font-medium leading-relaxed mb-6">A nutrition chart shows you individual items. A calculator shows you what your actual order costs — including all the extras people forget to count.</p>
                <div className="space-y-3">
                  {["Combines multiple items", "Adjusts for your diet goal", "Shows burn equivalents", "Works for any order size"].map((f) => (
                    <div key={f} className="flex items-center gap-3">
                      <span className="w-5 h-5 rounded-full bg-secondary/30 flex items-center justify-center shrink-0">
                        <ChevronRight size={10} className="text-secondary" />
                      </span>
                      <span className="text-sm font-bold text-white/80">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-[2rem] p-6 border border-gray-100 shadow-sm">
                <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-4">Explore More</p>
                <div className="space-y-2">
                  {[
                    { href: '/menu', label: 'Full Menu & Prices', icon: Utensils, color: 'text-primary' },
                    { href: '/wingstop-gluten-free', label: 'Gluten Free Options', icon: Leaf, color: 'text-emerald-500' },
                    { href: '/allergen-menu', label: 'Allergen Information', icon: AlertTriangle, color: 'text-amber-500' },
                    { href: '/locations', label: 'Find a Location', icon: MapPin, color: 'text-rose-500' },
                  ].map(lnk => (
                    <Link key={lnk.href} href={lnk.href} className="flex items-center gap-3 p-3.5 rounded-2xl hover:bg-gray-50 transition-colors group border border-transparent hover:border-gray-100">
                      <lnk.icon size={15} className={lnk.color} />
                      <span className="text-[11px] font-black text-gray-700 group-hover:text-primary transition-colors uppercase tracking-wide flex-1">{lnk.label}</span>
                      <ArrowRight size={12} className="text-gray-300 group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ MACROS SECTION ═══ */}
      <section className="py-28 bg-slate-50">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-stretch">
            <div className="bg-primary rounded-[2.5rem] p-12 text-white shadow-2xl shadow-primary/20 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/5 translate-x-24 -translate-y-24" />
              <div>
                <div className="w-14 h-14 rounded-[1.2rem] bg-white/10 flex items-center justify-center mb-8">
                  <Target size={28} className="text-secondary" />
                </div>
                <h2 className="text-4xl font-black italic uppercase tracking-tighter leading-none mb-8">Understanding Wingstop Macros</h2>
                <div className="space-y-6 relative z-10">
                  {[
                    { q: 'For High Protein', a: 'Classic bone-in wings: ~10g protein per piece, minimal carbs — ideal for muscle-building orders.' },
                    { q: 'For Low Carb / Keto', a: 'Avoid boneless and sauced items. Dry rubs like Lemon Pepper & Louisiana Rub are lowest carb.' },
                    { q: 'For Balanced Meals', a: 'A combo with 6 classic wings, veggie sticks, and no fries sits around 600–700 kcal total.' },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-5 group">
                      <div className="shrink-0 w-1.5 bg-secondary/40 rounded-full" />
                      <div>
                        <h4 className="text-[11px] font-black uppercase tracking-widest text-secondary mb-1.5">{item.q}</h4>
                        <p className="text-sm font-medium text-white/70 leading-relaxed">{item.a}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-10 pt-8 border-t border-white/10 flex items-center gap-4">
                <div className="p-3 bg-white/10 rounded-2xl"><Users size={18} className="text-secondary" /></div>
                <p className="text-sm font-black text-white">Best for: Calorie counters, macro trackers, gym-goers, and families</p>
              </div>
            </div>
            <div className="space-y-6">
              <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100">
                <h3 className="text-xl font-black text-gray-900 uppercase italic tracking-tight mb-6">Lowest vs Highest Calorie Classic Wings</h3>
                <div className="space-y-4">
                  {[
                    { name: 'Atomic', cal: 90, bar: 75, color: 'bg-emerald-400' },
                    { name: 'Cajun', cal: 90, bar: 75, color: 'bg-emerald-400' },
                    { name: 'Original Hot', cal: 90, bar: 75, color: 'bg-emerald-400' },
                    { name: 'Louisiana Rub', cal: 110, bar: 90, color: 'bg-amber-400' },
                    { name: 'Lemon Pepper', cal: 120, bar: 100, color: 'bg-rose-400' },
                    { name: 'Garlic Parmesan', cal: 120, bar: 100, color: 'bg-rose-400' },
                  ].map((f) => (
                    <div key={f.name} className="flex items-center gap-4 group">
                      <span className="text-[11px] font-black text-gray-400 w-36 shrink-0 uppercase tracking-wide">{f.name}</span>
                      <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className={`h-full ${f.color} rounded-full`} style={{ width: `${f.bar}%` }} />
                      </div>
                      <span className="text-sm font-black text-gray-800 w-16 text-right">{f.cal} cal</span>
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-gray-400 font-bold mt-5 uppercase tracking-widest">Per classic bone-in wing</p>
              </div>
              <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100">
                <h3 className="text-lg font-black text-gray-900 uppercase italic tracking-tight mb-5">Quick Macro Facts</h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { Icon: Dumbbell, iconColor: 'text-emerald-600', bg: 'bg-emerald-50', fact: '10g protein per classic wing', sub: 'Best protein-to-calorie ratio' },
                    { Icon: Beef, iconColor: 'text-primary', bg: 'bg-primary/5', fact: 'Bone-in = lower carbs', sub: 'No breading, cleaner macros' },
                    { Icon: AlertCircle, iconColor: 'text-amber-500', bg: 'bg-amber-50', fact: 'Ranch = 320 kcal', sub: 'Easy to miss in tracking' },
                    { Icon: Utensils, iconColor: 'text-rose-500', bg: 'bg-rose-50', fact: 'Fries: 500–900 kcal', sub: 'Biggest calorie add-on' },
                  ].map((f, i) => (
                    <div key={i} className="p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:-translate-y-0.5 hover:shadow-sm transition-all">
                      <div className={`w-9 h-9 rounded-xl ${f.bg} flex items-center justify-center mb-3`}>
                        <f.Icon size={18} className={f.iconColor} />
                      </div>
                      <p className="text-xs font-black text-gray-800 leading-tight">{f.fact}</p>
                      <p className="text-[9px] text-gray-400 mt-1 font-bold uppercase tracking-wider">{f.sub}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ NUTRITION DATA TABLES ═══ */}
      <section className="py-28 bg-white" id="nutrition-facts">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary/5 border border-primary/10 mb-6">
              <Zap size={12} className="text-primary" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary/60">Official 2026 Data</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-gray-900 italic uppercase leading-none mb-4">Official Wingstop Nutrition Facts (2026)</h2>
            <p className="text-base text-gray-500 font-medium max-w-2xl mx-auto leading-relaxed">Complete per-piece and per-serving data for every category.</p>
          </div>
          <div className="space-y-16">
            {Object.keys(FULL_NUTRITION_DATA).map((cat) => (
              <div key={cat} className="relative">
                <div className="absolute inset-0 bg-primary/5 rounded-[2.5rem] -rotate-1 skew-y-1 scale-105 pointer-events-none opacity-30" />
                <div className="relative bg-white rounded-[2.5rem] p-4 sm:p-8 shadow-xl shadow-gray-100/50 border border-gray-100 overflow-hidden">
                  <NutritionTable
                    title={`${cat} — Full Nutrition Facts`}
                    columns={NUTRITION_COLUMNS}
                    data={FULL_NUTRITION_DATA[cat as keyof typeof FULL_NUTRITION_DATA]}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-16 text-center">
            <Link href="/menu" className="inline-flex items-center gap-3 px-10 py-5 bg-primary text-white rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl shadow-primary/25 hover:bg-primary/90 hover:scale-105 active:scale-95 transition-all">
              View Complete Menu With Prices
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ INTERNAL LINKS ═══ */}
      <section className="py-20 bg-white border-t border-gray-50">
        <div className="max-w-[1200px] mx-auto px-6">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-300 text-center mb-10">More From Wingstop Calculator</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
            {[
              { href: '/menu', Icon: Beef, iconColor: 'text-primary', bg: 'bg-primary/5', label: 'Full Menu', sub: 'All items & prices' },
              { href: '/locations', Icon: MapPin, iconColor: 'text-rose-500', bg: 'bg-rose-50', label: 'Locations', sub: 'Find a Wingstop near you' },
              { href: '/allergen-menu', Icon: AlertTriangle, iconColor: 'text-amber-500', bg: 'bg-amber-50', label: 'Allergens', sub: 'Full allergen guide' },
              { href: '/wingstop-gluten-free', Icon: Leaf, iconColor: 'text-emerald-600', bg: 'bg-emerald-50', label: 'Gluten Free', sub: 'GF-friendly options' },
            ].map((l) => (
              <Link key={l.href} href={l.href} className="flex flex-col items-center text-center p-7 bg-gray-50 rounded-[2rem] border border-gray-100 hover:bg-white hover:shadow-xl hover:border-transparent hover:-translate-y-2 transition-all duration-300 group">
                <div className={`w-14 h-14 rounded-2xl ${l.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                  <l.Icon size={26} className={l.iconColor} />
                </div>
                <span className="text-sm font-black text-gray-800 group-hover:text-primary uppercase tracking-wide transition-colors">{l.label}</span>
                <span className="text-[10px] text-gray-400 font-bold mt-1 uppercase tracking-wider">{l.sub}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FAQ SECTION ═══ */}
      <section className="py-28 bg-slate-50 border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary/5 border border-primary/10 mb-6">
              <Zap size={12} className="text-primary" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary/60">Common Questions</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-gray-900 italic uppercase leading-none mb-4">
              Common Wingstop Nutrition Questions
            </h2>
            <p className="text-base text-gray-500 font-medium max-w-2xl mx-auto leading-relaxed">
              Answers to the most-searched calorie and macro questions about Wingstop.
            </p>
          </div>
          <FAQAccordion items={faqs} />
          
          <div className="mt-16 text-center">
            <a href="#calculator-top" className="inline-flex items-center gap-3 px-8 py-4 bg-white border-2 border-gray-100 text-gray-900 rounded-2xl font-black uppercase tracking-widest text-sm shadow-sm hover:border-primary hover:text-primary transition-all group">
              <CalcIcon size={18} className="text-gray-400 group-hover:text-primary transition-colors" />
              Back to Calculator
            </a>
          </div>
        </div>
      </section>

      {/* ═══ FINAL CTA ═══ */}
      <section className="py-28 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-white/5 translate-x-32 -translate-y-32" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-black/10 -translate-x-20 translate-y-20" />
        </div>
        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <div className="w-20 h-20 rounded-[1.5rem] bg-white/10 flex items-center justify-center mx-auto mb-8">
            <CalcIcon size={38} className="text-secondary" />
          </div>
          <h2 className="text-5xl sm:text-6xl font-black italic uppercase tracking-tighter text-white leading-none mb-6">
            Start Tracking Your Wingstop Meal Now
          </h2>
          <p className="text-white/60 font-black uppercase tracking-[0.3em] text-[11px] mb-12">
            Set your goal. Build your order. Know your macros.
          </p>
          <Link href="/menu" className="inline-flex items-center gap-3 px-10 py-5 bg-secondary text-primary rounded-2xl font-black uppercase tracking-widest text-sm shadow-2xl shadow-black/20 hover:scale-105 active:scale-95 transition-all">
            <Beef size={18} />
            Explore the Full Menu
          </Link>
        </div>
      </section>
    </main>
  );
}
