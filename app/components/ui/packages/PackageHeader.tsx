import classNames from 'classnames';
import Image from 'next/image';

export default function PackageHeader({
  logo_url,
  provider,
  name,
  className,
}: {
  logo_url: string;
  provider: string;
  name: string;
  className?: string;
}) {
  return (
    <div className={classNames(className)}>
      {logo_url && (
        <div className="mb-1">
          <Image
            src={logo_url}
            alt={`Logo of ${provider} internet package`}
            width={56}
            height={32}
          />
        </div>
      )}
      <span className="mb-1 text-xs text-muted">{provider}</span>
      <p className="text-sm font-medium">{name}</p>
    </div>
  );
}
