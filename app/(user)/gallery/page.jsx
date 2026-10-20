import GalleryClient from './GalleryClient';

export const metadata = {
  title: 'Photo Gallery: Events & Programmes | Samskrithi Pullur',
  description:
    'Browse photos from Samskrithi events, sports meets and cultural programmes in Pullur, Kerala, and relive the best moments from our community.',
  alternates: { canonical: '/gallery' },
};

export default function GalleryPage() {
  return <GalleryClient />;
}
