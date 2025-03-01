import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

export default function Check({ size = 'medium' }: { size?: 'small' | 'medium' | 'large' }) {
    return <i className="inline align-text-bottom"><CheckCircleOutlineIcon fontSize={size} className="mr-3 text-primary" /></i>;
}