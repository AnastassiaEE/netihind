import classNames from 'classnames';

export const H1 = ({ children, className }: { children: React.ReactNode; className?: string }) => {
    const cs = classNames({ [className as string]: className !== undefined });
    return (
        <h1
            className={`text-[calc(1.475rem+2.7vw)] md:text-5xl !leading-snug font-extrabold mb-6 ${cs}`}
        >
            {children}
        </h1>
    );
};

export const H2 = ({ children, className }: { children: React.ReactNode; className?: string }) => {
    const cs = classNames({ [className as string]: className !== undefined });
    return (
        <h2 className={`text-[calc(1.375rem+1.5vw)] md:text-4xl font-extrabold mb-6 ${cs}`}>
            {children}
        </h2>
    );
};

export const H3 = ({ children, className }: { children: React.ReactNode; className?: string }) => {
    const cs = classNames({ [className as string]: className !== undefined });
    return (
        <h3 className={`text-[calc(1.325rem+0.9vw)] md:text-3xl font-extrabold mb-6 ${cs}`}>
            {children}
        </h3>
    );
};
