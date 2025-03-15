import MenuIcon from '@mui/icons-material/Menu';

export default function Hamburger({
    label,
    handleClick,
}: {
    label: string;
    handleClick: React.MouseEventHandler<HTMLButtonElement>;
}) {
    return (
        <button type="button" aria-label={label} onClick={handleClick}>
            <MenuIcon fontSize="large" className="text-muted-dark" />
        </button>
    );
}
