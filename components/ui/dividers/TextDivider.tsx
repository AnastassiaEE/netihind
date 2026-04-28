export default function TextDivider({ text }: { text: string }) {
  return (
    <div className="my-6 flex items-center">
      <div className="h-px flex-1 bg-muted-light"></div>
      <span className="mx-4 uppercase text-muted">{text}</span>
      <div className="h-px flex-1 bg-muted-light"></div>
    </div>
  );
}
