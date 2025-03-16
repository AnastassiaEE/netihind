import { CheckCircle, Error } from '@mui/icons-material';
import { ReactNode } from 'react';
import classNames from 'classnames';

export default function FormResponse({
  type,
  children,
}: {
  type: string | undefined;
  children: ReactNode;
}) {
  const responseClasses = classNames('mt-4 text-sm ', {
    'text-green-600': type === 'success',
    'text-yellow-600': type === 'error',
  });

  return (
    <div className={responseClasses}>
      {type === 'success' && <CheckCircle className="mr-2" />}
      {type === 'error' && <Error className="mr-2" />}
      {children}
    </div>
  );
}
