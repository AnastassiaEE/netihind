import classNames from 'classnames';

export const H1 = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <h1
      className={classNames(
        'mb-10 text-[calc(1.375rem+1.5vw)] font-extrabold md:text-4xl md:leading-tight',
        className,
      )}
    >
      {children}
    </h1>
  );
};

export const H2 = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <h2
      className={classNames(
        'mb-6 text-[calc(1.275rem+0.3vw)] font-extrabold md:text-2xl',
        className,
      )}
    >
      {children}
    </h2>
  );
};
