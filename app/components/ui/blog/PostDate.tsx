import getFormattedDate from '@/utils/dateFormatter';

export default function PostDate({ date }: { date: string }) {
    return (
        <time dateTime={date} className="text-muted text-sm">
            {getFormattedDate(date)}
        </time>
    );
}
