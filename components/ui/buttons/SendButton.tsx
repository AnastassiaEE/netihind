import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/buttons/Button';

export default function SendButton({
  isSending,
  children,
  ...props
}: {
  isSending: boolean;
  children?: React.ReactNode;
} & React.ComponentProps<typeof Button>) {
  return (
    <Button type="submit" disabled={isSending} {...props}>
      {isSending ? <Loader2 className="h-4 w-4 animate-spin" /> : children}
    </Button>
  );
}
