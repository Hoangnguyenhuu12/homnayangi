'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { copy, type Language, type FoodCategory } from '@/lib/i18n';

interface CategorySelectorProps {
  value: FoodCategory;
  onChange: (cat: FoodCategory) => void;
  language: Language;
  disabled?: boolean;
}

const CATEGORIES: FoodCategory[] = ['food', 'drink'];

export function CategorySelector({ value, onChange, language, disabled }: CategorySelectorProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);
  const t = copy[language];

  // Đóng dropdown khi click ra ngoài
  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  const handleSelect = useCallback((cat: FoodCategory) => {
    onChange(cat);
    setOpen(false);
  }, [onChange]);

  const currentLabel = t.categories[value] || t.categories.food;

  return (
    <span ref={containerRef} className="meal-selector-container">
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen(prev => !prev)}
        className="meal-selector-trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={language === 'vi' ? 'Chọn loại món' : 'Select category'}
      >
        {currentLabel}
      </button>

      {open && (
        <div className="meal-selector-dropdown" role="listbox" tabIndex={-1}>
          {CATEGORIES.map((cat) => {
            const isSelected = cat === value;
            return (
              <div
                key={cat}
                role="option"
                aria-selected={isSelected}
                onClick={() => handleSelect(cat)}
                className={`meal-selector-item ${isSelected ? 'is-active' : ''}`}
              >
                <span className="meal-item-text">{t.categories[cat]}</span>
                {isSelected && <span className="meal-item-check" aria-hidden="true">✓</span>}
              </div>
            );
          })}
        </div>
      )}
    </span>
  );
}
