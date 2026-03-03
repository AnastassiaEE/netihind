export interface GtmConsent {
  analytics_storage?: 'granted' | 'denied';
  [key: string]: unknown;
}

export interface GtmEvent {
  event: string;
  consent?: GtmConsent;
  [key: string]: unknown;
}

declare global {
  interface Window {
    dataLayer: GtmEvent[] & { push: (event: GtmEvent) => void };
  }
}