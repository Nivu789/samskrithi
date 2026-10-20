import { sanitizeHtml } from '@/lib/html';

// Renders admin-entered text that may contain simple HTML tags.
export default function Html({ text }) {
  if (!text) return null;
  return <span dangerouslySetInnerHTML={{ __html: sanitizeHtml(text) }} />;
}
