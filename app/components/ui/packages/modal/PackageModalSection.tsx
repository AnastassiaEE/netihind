import classNames from 'classnames';

export default function PackageModalSection({
  title,
  className,
  children,
}: {
  title: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section className={classNames('rounded-md p-6 shadow-md', className)}>
      <p className="mb-4 text-xl font-extrabold text-black">{title}</p>
      {children}
    </section>
  );
}
