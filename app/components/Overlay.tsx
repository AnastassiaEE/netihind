export default function Overlay({
    isVisible = false,
    handleClick,
}: {
    isVisible?: boolean,
    handleClick?: React.MouseEventHandler
}) {
    return (
        <div 
            className={`fixed top-0 left-0 w-screen h-screen bg-black/70 ${!isVisible ? "hidden" : undefined}`} 
            onClick={handleClick}>
        </div>
    )
}