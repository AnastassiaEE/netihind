import getFormattedDate from '@/utils/dateFormatter';

export default function PostDate({ date }: { date: string }) {
    return (
        <time dateTime={date} className="text-sm text-muted">
            {getFormattedDate(date)}
        </time>
    );
}
