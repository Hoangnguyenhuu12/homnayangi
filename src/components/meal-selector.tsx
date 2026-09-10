'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { copy, type Language, type MealType, MEAL_ORDER } from '@/lib/i18n';

interface MealSelectorProps {
  value: MealType;
  onChange: (meal: MealType) => void;
  language: Language;
  disabled?: boolean;
}

export function MealSelector({ value, onChange, language, disabled }: MealSelectorProps) {
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

  const handleSelect = useCallback((meal: MealType) => {
    onChange(meal);
    setOpen(false);
  }, [onChange]);

  const currentLabel = t.meals[value] || t.meals.lunch;

  return (
    <span ref={containerRef} className="meal-selector-container">
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen(prev => !prev)}
        className="meal-selector-trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={language === 'vi' ? 'Chọn bữa ăn' : 'Select meal'}
      >
        {currentLabel}
      </button>

      {open && (
        <div className="meal-selector-dropdown" role="listbox" tabIndex={-1}>
          {MEAL_ORDER.map((meal) => {
            const isSelected = meal === value;
            return (
              <div
                key={meal}
                role="option"
                aria-selected={isSelected}
                onClick={() => handleSelect(meal)}
                className={`meal-selector-item ${isSelected ? 'is-active' : ''}`}
              >
                <span className="meal-item-text">{t.meals[meal]}</span>
                {isSelected && <span className="meal-item-check" aria-hidden="true">✓</span>}
              </div>
            );
          })}
        </div>
      )}
    </span>
  );
}
