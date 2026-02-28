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
        'mb-6 text-[calc(1.475rem+2.7vw)] leading-snug! font-extrabold md:text-5xl',
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
        'mb-6 text-[calc(1.375rem+1.5vw)] font-extrabold md:text-4xl',
        className,
      )}
    >
      {children}
    </h2>
  );
};

export const H3 = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <h3
      className={classNames(
        'mb-6 text-[calc(1.325rem+0.9vw)] font-extrabold md:text-3xl',
        className,
      )}
    >
      {children}
    </h3>
  );
};
