declare module '*.jpg';
declare module '*.png';
declare module '*.svg';

interface Window {
  dataLayer: any;
}

declare namespace JSX {
  interface IntrinsicElements {
    'df-messenger': any;
  }
}
