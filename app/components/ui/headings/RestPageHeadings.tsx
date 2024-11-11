import classNames from 'classnames';

export const H1 = ({ children, className }: { children: React.ReactNode; className?: string }) => {
    const cs = classNames({ [className as string]: className !== undefined });
    return (
        <h1 className={`text-[calc(1.375rem+1.5vw)] md:text-4xl md:leading-tight font-extrabold mb-10 ${cs}`}>
            {children}
        </h1>
    );
};

export const H2 = ({ children, className }: { children: React.ReactNode; className?: string }) => {
    const cs = classNames({ [className as string]: className !== undefined });
    return (
        <h2 className={`text-[calc(1.275rem+0.3vw)] md:text-2xl font-extrabold mb-6 ${cs}`}>
            {children}
        </h2>
    );
}