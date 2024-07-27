import { ChevronLeft }  from '@mui/icons-material';

const directions: {[key: string]: string} = {
    'left': '',
    'right': 'rotate-180',
    'up': 'rotate-90',
    'down': '-rotate-90'
}

export default function Arrow({direction}: {direction: string}) {
    return (
        <ChevronLeft className={directions[direction]}/>
    )
}