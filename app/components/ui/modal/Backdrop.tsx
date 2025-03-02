export default function Backdrop({
    isVisible,
    children,
}: {
    isVisible: boolean;
    children: React.ReactNode;
}) {
    return (
        <>
            {children}
            {isVisible && <div className="fixed inset-0 z-20 cursor-pointer bg-black/50"></div>}
        </>
    );
}
