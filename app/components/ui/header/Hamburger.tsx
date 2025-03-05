import MenuIcon from '@mui/icons-material/Menu';

export default function Hamburger({
    ariaLabel,
    handleClick,
}: {
    ariaLabel: string;
    handleClick: React.MouseEventHandler;
}) {
    return (
        <button
            name="open-sidebar-menu-button"
            type="button"
            aria-label={ariaLabel}
            onClick={handleClick}
        >
            <MenuIcon fontSize="large" className="text-muted-dark" />
        </button>
    );
}
