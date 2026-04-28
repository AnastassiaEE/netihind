import classNames from 'classnames';
import { useTranslations } from 'next-intl';

export default function CookieDetails({
  name,
  description,
  domain,
  policy,
  maxAge,
  type,
  className,
}: {
  name: string;
  description: string;
  domain: string;
  policy: string;
  maxAge: string;
  type: string;
  className?: string;
}) {
  const t = useTranslations('Cookies.attributes');
  return (
    <div className={classNames('rounded-md p-3 text-sm', className)}>
      <p className="mb-2 font-semibold text-black">{name}</p>
      <p className="mb-2">{description}</p>
      <p>
        <span className="font-semibold">{t('labels.domain')}: </span>
        <a
          href={policy}
          target="_blank"
          rel="noreferrer"
          className="underline transition-colors hover:text-primary"
        >
          {domain}
        </a>
      </p>
      <p>
        <span className="font-semibold">{t('labels.maxAge')}: </span>
        {maxAge}
      </p>
      <p>
        <span className="font-semibold">{t('labels.type')}: </span>
        {type}
      </p>
    </div>
  );
}
