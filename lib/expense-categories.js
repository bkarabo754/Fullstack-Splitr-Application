import {
  Coffee,
  ShoppingBag,
  Utensils,
  Plane,
  Car,
  Home,
  Film,
  ShoppingCart,
  Ticket,
  Wifi,
  Droplets,
  GraduationCap,
  Heart,
  Stethoscope,
  Gift,
  Smartphone,
  MoreHorizontal,
  CreditCard,
  Baby,
  Music,
  Book,
  DollarSign,
} from 'lucide-react';

// Define badge categories for enhanced UX
const CATEGORY_BADGES = {
  essential: 'Essential',
  leisure: 'Leisure',
  lifestyle: 'Lifestyle',
  education: 'Education',
  health: 'Health',
  misc: 'Miscellaneous',
};

// 🧠 Unified categories object
export const EXPENSE_CATEGORIES = {
  foodDrink: {
    id: 'foodDrink',
    name: 'Food & Drink',
    icon: Utensils,
    badge: CATEGORY_BADGES.essential,
  },
  coffee: {
    id: 'coffee',
    name: 'Coffee',
    icon: Coffee,
    badge: CATEGORY_BADGES.lifestyle,
  },
  groceries: {
    id: 'groceries',
    name: 'Groceries',
    icon: ShoppingCart,
    badge: CATEGORY_BADGES.essential,
  },
  shopping: {
    id: 'shopping',
    name: 'Shopping',
    icon: ShoppingBag,
    badge: CATEGORY_BADGES.lifestyle,
  },
  travel: {
    id: 'travel',
    name: 'Travel',
    icon: Plane,
    badge: CATEGORY_BADGES.leisure,
  },
  transportation: {
    id: 'transportation',
    name: 'Transportation',
    icon: Car,
    badge: CATEGORY_BADGES.essential,
  },
  housing: {
    id: 'housing',
    name: 'Housing',
    icon: Home,
    badge: CATEGORY_BADGES.essential,
  },
  entertainment: {
    id: 'entertainment',
    name: 'Entertainment',
    icon: Film,
    badge: CATEGORY_BADGES.leisure,
  },
  tickets: {
    id: 'tickets',
    name: 'Tickets',
    icon: Ticket,
    badge: CATEGORY_BADGES.leisure,
  },
  utilities: {
    id: 'utilities',
    name: 'Utilities',
    icon: Wifi,
    badge: CATEGORY_BADGES.essential,
  },
  water: {
    id: 'water',
    name: 'Water',
    icon: Droplets,
    badge: CATEGORY_BADGES.essential,
  },
  education: {
    id: 'education',
    name: 'Education',
    icon: GraduationCap,
    badge: CATEGORY_BADGES.education,
  },
  health: {
    id: 'health',
    name: 'Health',
    icon: Stethoscope,
    badge: CATEGORY_BADGES.health,
  },
  personal: {
    id: 'personal',
    name: 'Personal Care',
    icon: Heart,
    badge: CATEGORY_BADGES.lifestyle,
  },
  gifts: {
    id: 'gifts',
    name: 'Gifts',
    icon: Gift,
    badge: CATEGORY_BADGES.misc,
  },
  technology: {
    id: 'technology',
    name: 'Technology',
    icon: Smartphone,
    badge: CATEGORY_BADGES.lifestyle,
  },
  bills: {
    id: 'bills',
    name: 'Bills & Fees',
    icon: CreditCard,
    badge: CATEGORY_BADGES.essential,
  },
  baby: {
    id: 'baby',
    name: 'Baby & Kids',
    icon: Baby,
    badge: CATEGORY_BADGES.essential,
  },
  music: {
    id: 'music',
    name: 'Music',
    icon: Music,
    badge: CATEGORY_BADGES.leisure,
  },
  books: {
    id: 'books',
    name: 'Books',
    icon: Book,
    badge: CATEGORY_BADGES.education,
  },
  other: {
    id: 'other',
    name: 'Other',
    icon: MoreHorizontal,
    badge: CATEGORY_BADGES.misc,
  },
  general: {
    id: 'general',
    name: 'General Expense',
    icon: DollarSign,
    badge: CATEGORY_BADGES.misc,
  },
};

// 🧩 Helper: Get category by ID with graceful fallback
export const getCategoryById = (categoryId) => {
  return EXPENSE_CATEGORIES[categoryId] || EXPENSE_CATEGORIES.other;
};

// 📥 Helper: Get all categories for dropdowns, etc.
export const getAllCategories = () => {
  return Object.values(EXPENSE_CATEGORIES);
};

// 🎨 Helper: Get icon component for a category
export const getCategoryIcon = (categoryId) => {
  return getCategoryById(categoryId).icon;
};

// 🏷️ Helper: Get badge type for a category
export const getCategoryBadge = (categoryId) => {
  return getCategoryById(categoryId).badge;
};
