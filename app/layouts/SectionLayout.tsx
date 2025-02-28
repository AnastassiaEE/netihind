import classNames from 'classnames';

export default function SectionLayout({
  bg,
  className,
  children,
}: {
  bg?: string;
  className?: string;
  children: React.ReactNode;
}) {
  const sectionClasses = classNames(bg, className);

  return (
    <section className={sectionClasses}>
      <div className="container">{children}</div>
    </section>
  );
}
