// Admin-entered text may contain simple HTML (<em>, <br>, <strong>, ...).
// This strips the dangerous bits before it is rendered as markup.
export function sanitizeHtml(input) {
  if (typeof input !== 'string') return '';
  return input
    .replace(/\\n|\r?\n/g, '<br />')
    .replace(/<\s*(script|style|iframe|object|embed|link|meta)[\s\S]*?(<\s*\/\s*\1\s*>|$)/gi, '')
    .replace(/<\s*(script|style|iframe|object|embed|link|meta)\b[^>]*>/gi, '')
    .replace(/\son\w+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, '')
    .replace(/(href|src)\s*=\s*("|')?\s*javascript:[^"'>\s]*/gi, '$1=$2#');
}

export function stripHtml(input) {
  if (typeof input !== 'string') return '';
  return input.replace(/\\n|\r?\n/g, ' ').replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim();
}
