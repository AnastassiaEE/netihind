import { ChevronLeft }  from '@mui/icons-material';
import classNames from 'classnames';

export default function Arrow({direction}: {direction: string}) {
    
    const arrowClasses = classNames({
        'rotate-180': direction === 'right',
        'rotate-90': direction === 'up',
        '-rotate-90': direction === 'down'
    })

    return <ChevronLeft className={arrowClasses}/>
}