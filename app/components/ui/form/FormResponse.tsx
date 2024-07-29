import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import { ReactNode } from 'react';

export default function FormResponse({
    type,
    children
}: {
    type: string | undefined,
    children: ReactNode
}) {
    return (
        <div className={`text-sm mt-4 
            ${type === 'success' ? 'text-green-600' : undefined} 
            ${type === 'error' ? 'text-yellow-600' : undefined}`}> 
            {type === 'success' && <CheckCircleIcon className="mr-2"/>}
            {type === 'error' && <ErrorIcon className="mr-2"/>}
            {children}
        </div>
    )
}