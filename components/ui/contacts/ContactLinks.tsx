import React from 'react';

export default function ContactLinks({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ul className="space-y-2">
      {React.Children.map(children, (child) => (
        <li>{child}</li>
      ))}
    </ul>
  );
}
