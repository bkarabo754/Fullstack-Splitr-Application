'use client';

import { useState, useEffect } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tag, ListTree, Sparkles } from 'lucide-react';
import { Label } from '@/components/ui/label';

export function CategorySelector({ categories, onChange }) {
  const [selectedCategory, setSelectedCategory] = useState('');

  // Handle when a category is selected
  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);

    // Only call onChange if it exists and the value has changed
    if (onChange && categoryId !== selectedCategory) {
      onChange(categoryId);
    }
  };

  // If no categories or empty categories array
  if (!categories || categories.length === 0) {
    return <div>No categories available</div>;
  }

  // Set default value if not already set
  if (!selectedCategory && categories.length > 0) {
    // Find a default category or use the first one
    const defaultCategory =
      categories.find((cat) => cat.isDefault) || categories[0];

    // Set the default without triggering a re-render loop
    setTimeout(() => {
      setSelectedCategory(defaultCategory.id);
      if (onChange) {
        onChange(defaultCategory.id);
      }
    }, 0);
  }

  return (
    <div className="space-y-2 w-full">
      <Label className="text-sm font-medium text-foreground mb-0.5 flex items-center gap-2">
        Select Category
      </Label>

      <Select value={selectedCategory} onValueChange={handleCategoryChange}>
        <SelectTrigger className="w-full h-10 text-sm shadow-sm rounded-md">
          <SelectValue placeholder="Choose a category" />
        </SelectTrigger>

        <SelectContent className="rounded-xl shadow-lg">
          {categories.map((category) => (
            <SelectItem
              key={category.id}
              value={category.id}
              className="flex items-center gap-2 text-sm"
            >
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-muted-foreground" />
                <span className="font-medium">{category.name}</span>
                {category.isDefault && (
                  <Badge
                    variant="secondary"
                    className="ml-2 text-xs px-2 py-0.5 rounded-full"
                  >
                    <Sparkles className="w-3 h-3 mr-1" />
                    Default
                  </Badge>
                )}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
