'use client';

import CookiesButton from '@/components/ui/cookies/CookiesButton';
import Dialogue from '@/components/ui/overlay/Dialog';
import Tabs from '@/components/ui/tabs/Tabs';
import TabPanel from '@/components/ui/tabs/TabPanel';
import { useTranslations } from 'next-intl';
import CookiesConsentSection from '@/components/ui/cookies/CookiesConsentSection';
import CookiesDetailsSection from '@/components/ui/cookies/CookiesDetailsSection';
import CookiesActions from '@/components/ui/cookies/CookiesActions';
import CookiesInfoSection from '@/components/ui/cookies/CookiesInfoSection';
import useCookiesModal from '@/hooks/useCookiesModal';

export default function CookiesModal() {
  const b = useTranslations('Buttons');
  const c = useTranslations('Cookies');
  const tabs = [c('tabs.consent'), c('tabs.details'), c('tabs.info')];

  const {
    openCookiesModal,
    isCookiesModalOpened,
    cookiesModalRef,
    preferences,
    togglePreference,
    managePreferences,
  } = useCookiesModal();

  return (
    <>
      <CookiesButton label={b('cookies.open')} handleClick={openCookiesModal} />
      <Dialogue
        type="modal"
        name="cookies"
        title={c('title')}
        isOpened={isCookiesModalOpened}
        dialogRef={cookiesModalRef}
        className="flex flex-col overflow-hidden bg-white"
      >
        <Tabs name="cookies" tabs={tabs}>
          <TabPanel className="h-auto overflow-y-auto">
            <CookiesConsentSection />
          </TabPanel>
          <TabPanel className="h-auto overflow-y-auto">
            <CookiesDetailsSection
              preferences={preferences}
              togglePreference={togglePreference}
            />
          </TabPanel>
          <TabPanel className="h-auto overflow-y-auto">
            <CookiesInfoSection />
          </TabPanel>
        </Tabs>
        <CookiesActions
          managePreferences={managePreferences}
          className="mt-3"
        />
      </Dialogue>
    </>
  );
}
