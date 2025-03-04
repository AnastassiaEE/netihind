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
        <div className={`bg-white rounded-lg shadow-md p-6 ${classNames(className)}`}>
            <p className="text-black text-lg font-extrabold mb-4">{title}</p>
            {children}
        </div>
    );
}
