import classNames from 'classnames';

export const H1 = ({ children, className }: { children: React.ReactNode; className?: string }) => {
    const cs = classNames({ [className as string]: className !== undefined });
    return (
        <h1
            className={`mb-10 text-[calc(1.375rem+1.5vw)] font-extrabold md:text-4xl md:leading-tight ${cs}`}
        >
            {children}
        </h1>
    );
};

export const H2 = ({ children, className }: { children: React.ReactNode; className?: string }) => {
    const cs = classNames({ [className as string]: className !== undefined });
    return (
        <h2 className={`mb-6 text-[calc(1.275rem+0.3vw)] font-extrabold md:text-2xl ${cs}`}>
            {children}
        </h2>
    );
};
