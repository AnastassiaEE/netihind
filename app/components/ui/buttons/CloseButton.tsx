import CloseIcon from '@mui/icons-material/Close';
import classNames from 'classnames';

export default function CloseButton({
    handleClick,
    className,
}: {
    handleClick: () => void;
    className?: string;
}) {
    const buttonClasses = classNames('rounded-full p-[3px] w-max h-max', className);
    return (
        <button type="button" className={buttonClasses} onClick={handleClick}>
            <CloseIcon className="text-muted transition-colors hover:text-black" />
        </button>
    );
}
