import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import { ReactNode } from 'react';
import classNames from 'classnames';

export default function FormResponse({
    type,
    children
}: {
    type: string | undefined,
    children: ReactNode
}) {
    const responseClasses = classNames('text-sm mt-4 ', {
        'text-green-600': type === 'success',
        'text-yellow-600': type === 'error'
    })
    
    return (
        <div className={responseClasses}> 
            {type === 'success' && <CheckCircleIcon className="mr-2"/>}
            {type === 'error' && <ErrorIcon className="mr-2"/>}
            {children}
        </div>
    )
}