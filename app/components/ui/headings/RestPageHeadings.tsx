import classNames from 'classnames';

export const H1 = ({ children, className }: { children: React.ReactNode; className?: string }) => {
    const cs = classNames({ [className as string]: className !== undefined });
    return (
        <h1 className={`text-[calc(1.375rem+1.5vw)] md:text-4xl font-extrabold mb-10 ${cs}`}>
            {children}
        </h1>
    );
};
