/// <reference types="vite/client" />
type Asset = {
  id: string;
  title: string;
  type: string;
  images: string[];
  audio: string;
};

type Timestamp = {
  id: string;
  start: number;
  end: number;
};

declare namespace JSX {
  interface IntrinsicElements {
    'swiper-container': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
      pagination?: boolean;
    };
    'swiper-slide': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
    };
  }
}