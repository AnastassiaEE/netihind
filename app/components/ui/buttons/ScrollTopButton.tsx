'use client';

import classNames from 'classnames';
import CircleArrow from '@/components/ui/icons/CircleArrow';
import useScrollTopButton from '@/hooks/useScrollTopButton';
import { useTranslations } from 'next-intl';

export default function ScrollTopButton() {
  const { y, handleClick } = useScrollTopButton();
  const t = useTranslations('Buttons');
  return (
    <button
      aria-label={t('scroll-top')}
      className={classNames(
        'fixed right-5 z-10 transition-all duration-500',
        y >= 600 ? 'bottom-5' : '-bottom-16',
      )}
      onClick={handleClick}
    >
      <CircleArrow
        className="!h-11 !w-11 bg-gray-900/25 text-white"
        direction="up"
      />
    </button>
  );
}
