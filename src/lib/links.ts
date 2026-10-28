export const SIGNUP_URL = 'https://app.sejaconte.com.br/cadastro';
export const WHATSAPP_URL = 'https://wa.me/5541987016965';
export const BLOG_URL = 'https://blog.sejaconte.com.br';
export const INSTAGRAM_URL = 'https://www.instagram.com/seja.conte';
export const SITE_URL = 'https://sejaconte.com.br';
export const EMAIL = 'oi@sejaconte.com.br';
// Registro profissional da contadora responsável no Conselho Regional de Contabilidade.
export const CRC_REGISTRATION: string | null = 'CRC-PR 053.617/O-8';
export const ACCOUNTANT_NAME = 'Solange';

// WhatsApp link with the simulated case already typed, so the conversation starts from the person's numbers
// and we can tell which page brought the lead.
export const whatsappLink = (text: string) => `${WHATSAPP_URL}?text=${encodeURIComponent(text)}`;
