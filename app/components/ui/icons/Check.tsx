import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

export default function Tick({
    size = 'medium'
}: {
    size?: 'small' | 'medium' | 'large'
}) {
    return <CheckCircleOutlineIcon fontSize={size} className="text-primary mr-3"/>
}