import CloseIcon from '@mui/icons-material/Close';
import classNames from 'classnames';

export default function CloseButton({
    label,
    handleClick,
    className,
}: {
    label: string;
    handleClick: () => void;
    className?: string;
}) {
    return (
        <button
            type="button"
            aria-label={label}
            className={classNames('rounded-full p-[3px] w-max h-max', className)}
            onClick={handleClick}
        >
            <CloseIcon className="text-muted transition-colors hover:text-black" />
        </button>
    );
}
