import classNames from 'classnames';
import { useTranslations } from 'next-intl';

export default function CookieDetails({
  name,
  description,
  domain,
  maxAge,
  type,
  className,
}: {
  name: string;
  description: string;
  domain: string;
  maxAge: string;
  type: string;
  className?: string;
}) {
  const t = useTranslations('Cookies');
  return (
    <div
      className={classNames(
        'rounded-md bg-primary-light p-3 text-sm',
        className,
      )}
    >
      <p className="mb-2 font-semibold text-black">{name}</p>
      <p className="mb-2">{description}</p>
      <p>
        <span className="font-semibold">{t('attributes.labels.domain')}: </span>
        {domain}
      </p>
      <p>
        <span className="font-semibold">{t('attributes.labels.maxAge')}: </span>
        {maxAge}
      </p>
      <p>
        <span className="font-semibold">{t('attributes.labels.type')}: </span>
        {type}
      </p>
    </div>
  );
}
