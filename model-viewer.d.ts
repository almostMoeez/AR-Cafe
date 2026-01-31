import 'react';

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          src?: string;
          poster?: string;
          alt?: string;
          ar?: boolean;
          'ar-modes'?: string;
          'ar-scale'?: string;
          'ar-placement'?: string;
          'camera-controls'?: boolean;
          'shadow-intensity'?: string;
          exposure?: string;
          loading?: 'auto' | 'lazy' | 'eager';
          reveal?: 'auto' | 'interaction' | 'manual';
          'environment-image'?: string;
          'ios-src'?: string;
          'auto-rotate'?: boolean;
        },
        HTMLElement
      >;
    }
  }
}
