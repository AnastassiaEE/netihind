import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

export default function Pros({ size = 'medium' }: { size?: 'small' | 'medium' | 'large' }) {
    return <i className="inline align-text-bottom"><RemoveCircleOutlineIcon fontSize={size} className="text-red-600 mr-3" /></i>;
}