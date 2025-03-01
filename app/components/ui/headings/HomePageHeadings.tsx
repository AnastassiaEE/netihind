import classNames from 'classnames';

export const H1 = ({ children, className }: { children: React.ReactNode; className?: string }) => {
    const cs = classNames({ [className as string]: className !== undefined });
    return (
        <h1
            className={`mb-6 text-[calc(1.475rem+2.7vw)] font-extrabold !leading-snug md:text-5xl ${cs}`}
        >
            {children}
        </h1>
    );
};

export const H2 = ({ children, className }: { children: React.ReactNode; className?: string }) => {
    const cs = classNames({ [className as string]: className !== undefined });
    return (
        <h2 className={`mb-6 text-[calc(1.375rem+1.5vw)] font-extrabold md:text-4xl ${cs}`}>
            {children}
        </h2>
    );
};

export const H3 = ({ children, className }: { children: React.ReactNode; className?: string }) => {
    const cs = classNames({ [className as string]: className !== undefined });
    return (
        <h3 className={`mb-6 text-[calc(1.325rem+0.9vw)] font-extrabold md:text-3xl ${cs}`}>
            {children}
        </h3>
    );
};
