import GalleryClient from './GalleryClient';

export const metadata = {
  title: 'Gallery — Samskrithi',
  description:
    'Photos from Samskrithi events, sports and cultural programmes — relive the moments from our community.',
  alternates: { canonical: '/gallery' },
};

export default function GalleryPage() {
  return <GalleryClient />;
}
