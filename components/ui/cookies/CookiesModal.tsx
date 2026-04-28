'use client';

import CookiesButton from '@/components/ui/cookies/CookiesButton';
import Dialogue from '@/components/ui/overlay/Dialog';
import Tabs from '@/components/ui/tabs/Tabs';
import TabPanel from '@/components/ui/tabs/TabPanel';
import { useTranslations } from 'next-intl';
import CookiesIntroSection from '@/components/ui/cookies/sections/CookiesIntroSection';
import CookiesPreferencesSection from '@/components/ui/cookies/sections/CookiesPreferencesSection';
import CookiesActions from '@/components/ui/cookies/CookiesActions';
import CookiesInfoSection from '@/components/ui/cookies/sections/CookiesInfoSection';
import useCookiesModal from '@/hooks/useCookiesModal';

export default function CookiesModal() {
  const b = useTranslations('Buttons.cookies');
  const c = useTranslations('Cookies');
  const tabs = [c('tabs.consent'), c('tabs.details'), c('tabs.info')];

  const {
    openCookiesModal,
    isCookiesModalMounted,
    isCookiesModalVisible,
    cookiesModalRef,
    preferences,
    togglePreference,
    managePreferences,
  } = useCookiesModal();

  return (
    <>
      <CookiesButton label={b('open')} handleClick={openCookiesModal} />
      <Dialogue
        type="modal"
        name="cookies"
        title={c('title')}
        isMounted={isCookiesModalMounted}
        isVisible={isCookiesModalVisible}
        dialogRef={cookiesModalRef}
        className="flex flex-col overflow-hidden bg-white"
      >
        <Tabs name="cookies" tabs={tabs}>
          <TabPanel className="h-auto space-y-3 overflow-y-auto">
            <CookiesIntroSection />
          </TabPanel>
          <TabPanel className="h-auto overflow-y-auto">
            <CookiesPreferencesSection
              preferences={preferences}
              togglePreference={togglePreference}
            />
          </TabPanel>
          <TabPanel className="h-auto space-y-3 overflow-y-auto">
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
