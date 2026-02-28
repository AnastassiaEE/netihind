'use client';

import useButtonsFilter from '@/hooks/useButtonsFilter';
import Button from '@/components/ui/form/buttons/Button';
import { useTranslations } from 'next-intl';
import React from 'react';
import { translateKey } from '@/utils/translationHelper';

export default function ButtonsFilter({
  options,
}: {
  options: Record<string, boolean>;
}) {
  const { usedOptions, handleOptionClick } = useButtonsFilter(options);
  const t = useTranslations('Filters');
  return (
    <div className="flex flex-wrap gap-2">
      {Object.entries(usedOptions).map(([option, isSelected]) => (
        <Button
          key={option}
          onClick={() => handleOptionClick(option)}
          variant={isSelected ? 'contained' : 'neutral'}
          className="rounded-md uppercase"
          name={option}
        >
          {translateKey(t, option)}
        </Button>
      ))}
    </div>
  );
}
