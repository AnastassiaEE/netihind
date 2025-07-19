import { SvgIconComponent } from '@mui/icons-material';
import React from 'react';

export default function PackageDetail({
  Icon,
  title,
  children,
}: {
  Icon: SvgIconComponent;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <Icon className="mr-4 text-6xl text-muted-light" />
      <div>
        <p className="mb-1 text-sm font-semibold">{title}</p>
        <ul className="list-inside list-disc">
          {React.Children.map(children, (child, index) => {
            if (React.isValidElement(child)) {
              return (
                <li key={index} className="text-sm/tight text-muted-dark">
                  {child}
                </li>
              );
            }
            return child;
          })}
        </ul>
      </div>
    </div>
  );
}
