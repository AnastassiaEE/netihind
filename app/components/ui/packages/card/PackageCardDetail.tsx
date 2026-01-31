import { SvgIconComponent } from '@mui/icons-material';
import React from 'react';

export default function PackageCardDetail({
  Icon,
  children,
}: {
  Icon: SvgIconComponent;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <Icon className="flex-shrink-0 text-4xl text-muted-light" />
      <span className="text-muted-dark">{children}</span>
    </div>
  );
}
