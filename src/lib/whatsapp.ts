import { contact } from '@data/cv';

/**
 * A wa.me link with the message already typed. Opening a chat with an empty box
 * makes the visitor compose an opening line, which is the moment most people
 * close the tab.
 */
export function whatsappLink(text: string): string {
  return `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(text)}`;
}
