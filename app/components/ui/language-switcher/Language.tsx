import classNames from 'classnames';
import { Link } from '@/i18n/routing';
import { Locale, useTranslations } from 'next-intl';

export default function Language({
  href,
  locale,
  current,
}: {
  href: any;
  locale: Locale;
  current: boolean;
}) {
  const t = useTranslations('Buttons.language');

  const languageClasses = classNames(
    'text-muted-dark hover:text-primary cursor-pointer border-b-2 font-semibold uppercase transition-colors',
    current ? 'border-primary' : 'border-transparent',
  );

  return (
    <Link
      href={href}
      locale={locale}
      aria-label={t(`${locale}`)}
      aria-current={current ? 'true' : undefined}
      className={languageClasses}
    >
      {locale.toUpperCase()}
    </Link>
  );
}
