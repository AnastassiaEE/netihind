import Image from 'next/image';

export default function PackageHeader({
  providerLogoSrc,
  providerName,
  packageName,
  className,
}: {
  providerLogoSrc: string;
  providerName: string;
  packageName: string;
  className?: string;
}) {
  return (
    <div className={className}>
      {providerLogoSrc && (
        <div className="mb-1">
          <Image
            src={providerLogoSrc}
            alt={`Logo of ${providerName} internet package`}
            width={56}
            height={32}
          />
        </div>
      )}
      <span className="mb-1 text-xs text-muted">{providerName}</span>
      <p className="text-sm font-medium">{packageName}</p>
    </div>
  );
}
