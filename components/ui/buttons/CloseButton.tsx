import { X } from 'lucide-react';
import classNames from 'classnames';
import React from 'react';

export default function CloseButton({
  label,
  onClick,
  className,
}: {
  label: string;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      className={classNames('size-max rounded-full p-0.75', className)}
      onClick={onClick}
    >
      <X size={24} className="text-muted transition-colors hover:text-black" />
    </button>
  );
}
