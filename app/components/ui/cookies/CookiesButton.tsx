import CookieIcon from '@mui/icons-material/Cookie';

export default function CookiesButton({
  label,
  handleClick,
}: {
  label: string;
  handleClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={handleClick}
      className="bg-primary/50 hover:bg-primary-dark fixed bottom-2 left-2 z-10 flex w-12.5 items-center overflow-hidden rounded-md p-2 font-medium text-white transition-all hover:w-32.5"
    >
      <CookieIcon fontSize="large" />
      <span className="ml-2">Küpsised</span>
    </button>
  );
}
