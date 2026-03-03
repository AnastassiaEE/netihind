import getFormattedDate from '@/utils/dateFormatter';

export default function PostDate({ date }: { date?: string }) {
  if (!date) return null;
  return (
    <time dateTime={date} className="text-muted text-sm">
      {getFormattedDate(date).toString()}
    </time>
  );
}
