import classNames from "classnames";

export default function SortingToolbar({
    className,
    children,
}: {
    className?: string;
    children: React.ReactNode;
}) {
    const toolbarClasses = classNames('sticky bottom-0 z-10 flex justify-around bg-white shadow-top px-2 py-4 w-[105%] -mx-[2.5%] mt-7', className);
    return (
        <div className={toolbarClasses}>
            {children}
        </div>
    );
}
