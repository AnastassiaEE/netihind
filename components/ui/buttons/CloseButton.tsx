import CloseIcon from '@mui/icons-material/Close';
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
      <CloseIcon className="text-muted transition-colors hover:text-black" />
    </button>
  );
}
