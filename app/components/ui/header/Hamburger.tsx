import MenuIcon from '@mui/icons-material/Menu';

export default function Hamburger({ handleClick }: { handleClick: React.MouseEventHandler }) {
    return (
        <button name="open-sidebar-menu-button" type="button" onClick={handleClick}>
            <MenuIcon fontSize="large" className="text-muted-dark" />
        </button>
    );
}
