import CookieIcon from '@mui/icons-material/Cookie';

export default function CookieButton({ handleClick }: { handleClick: () => void }) {
    return (
        <button
            type="button"
            onClick={handleClick}
            className="fixed bottom-2 left-2 z-10 flex w-[50px] items-center overflow-hidden rounded-md bg-primary p-2 font-medium text-white transition-all hover:w-[130px] hover:bg-primary-dark"
        >
            <CookieIcon fontSize="large" />
            <span className="ml-2">Küpsised</span>
        </button>
    );
}
