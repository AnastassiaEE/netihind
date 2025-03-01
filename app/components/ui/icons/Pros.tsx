import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

export default function Pros({ size = 'medium' }: { size?: 'small' | 'medium' | 'large' }) {
    return <i className="inline align-text-bottom"><AddCircleOutlineIcon fontSize={size} className="mr-3 text-green-600" /></i>;
}