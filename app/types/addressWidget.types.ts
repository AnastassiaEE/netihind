export {};

interface InAadressConfig {
  container: string;
  mode: number;
  ihist: string;
  appartment: number;
  lang: string;
}

interface InAadress {
  new (config: InAadressConfig): unknown;
}

declare global {
  interface Window {
    InAadress: InAadress;
  }
}
