'use client';

import classNames from 'classnames';
import { FormElementSizes as sizes } from '@/styles/styles';
import { useEffect, useRef } from 'react';

export default function Option({
    value,
    handleChange,
    isSelected,
    size = 'sm',
    className,
    children,
}: {
    value: string;
    handleChange?: (value: string) => void;
    isSelected: boolean;
    size?: keyof typeof sizes;
    className?: string;
    children: React.ReactNode;
}) {
    const optionClasses = classNames(
        'cursor-pointer text-muted-dark hover:bg-primary/10',
        isSelected && 'font-semibold text-primary',
        sizes[size],
        className,
    );

    const optionRef = useRef<HTMLLIElement | null>(null);

    const handleTabKey = (e: KeyboardEvent) => {
        const focusableElements = optionRef.current?.parentElement?.querySelectorAll(
            'li[role="option"]',
        ) as NodeListOf<HTMLElement>;

        const firstFocusableElement = focusableElements[0];
        const lastFocusableElement = focusableElements[focusableElements.length - 1];

        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstFocusableElement) {
                    lastFocusableElement?.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastFocusableElement) {
                    firstFocusableElement?.focus();
                    e.preventDefault();
                }
            }
        }
    };

    useEffect(() => {
        if (optionRef.current) {
            optionRef.current.addEventListener('keydown', handleTabKey);
        }
        return () => {
            if (optionRef.current) {
                optionRef.current.removeEventListener('keydown', handleTabKey);
            }
        };
    }, []);

    return (
        <li
            id={value}
            role="option"
            aria-selected={isSelected}
            data-value={value}
            onClick={() => handleChange?.(value)}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    handleChange?.(value);
                }
            }}
            ref={optionRef}
            className={optionClasses}
            tabIndex={0}
        >
            {children}
        </li>
    );
}
