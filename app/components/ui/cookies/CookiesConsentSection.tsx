import { useTranslations } from 'next-intl';

export default function CookiesConsentSection() {
  const t = useTranslations('Cookies');
  return (
    <>
      {t.rich('consent', {
        p: (chunks: React.ReactNode) => (
          <p className="[&:not(:last-child)]:mb-3">{chunks}</p>
        ),
        strong: (chunks: React.ReactNode) => <strong>{chunks}</strong>,
        a: (chunks: React.ReactNode) => (
          <a
            href="/policy"
            target="_blank"
            className="font-semibold transition-colors hover:text-primary"
          >
            {chunks}
          </a>
        ),
      })}
    </>
  );
}
