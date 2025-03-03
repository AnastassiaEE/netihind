export default function Backdrop({
    isVisible,
    handleClose,
    children,
}: {
    isVisible: boolean;
    handleClose: () => void;
    children: React.ReactNode;
}) {
    return (
        <>
            {children}
            {isVisible && (
                <div onClick={handleClose} className="fixed inset-0 z-20 cursor-pointer bg-black/50"></div>
            )}
        </>
    );
}
