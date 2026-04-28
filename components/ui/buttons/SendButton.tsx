import { Loop } from '@mui/icons-material';
import Button from '@/components/ui/form/buttons/Button';

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
      {isSending ? <Loop className="mx-auto animate-spin" /> : children}
    </Button>
  );
}
