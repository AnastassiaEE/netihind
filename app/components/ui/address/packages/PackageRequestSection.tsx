import classNames from 'classnames';

export default function PackageRequestSection({
  title,
  className,
  children,
}: {
  title: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={classNames('rounded-lg bg-white p-6 shadow-md', className)}>
      <p className="mb-4 text-lg font-extrabold text-black">{title}</p>
      {children}
    </div>
  );
}
