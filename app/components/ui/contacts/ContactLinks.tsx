import React from 'react';

export default function ContactLinks({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ul>
      {React.Children.map(children, (child) => (
        <li className="[&:not(:last-child)]:mb-3">{child}</li>
      ))}
    </ul>
  );
}
