import MenuIcon from '@mui/icons-material/Menu';

export default function Hamburger({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  return (
    <button type="button" aria-label={label} onClick={onClick}>
      <MenuIcon fontSize="large" className="text-muted-dark" />
    </button>
  );
}
