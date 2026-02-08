import { Loop } from '@mui/icons-material';
import Button from '@/components/ui/form/buttons/Button';
import { ButtonSize } from '@/types/form.types';

export default function SendButton({
  size = 'sm',
  isSending,
  children,
  className,
}: {
  size?: ButtonSize;
  isSending: boolean;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <Button
      type="submit"
      size={size}
      disabled={isSending}
      className={className}
    >
      {isSending ? <Loop className="mx-auto animate-spin" /> : <>{children}</>}
    </Button>
  );
}
