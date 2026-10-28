import React from 'react';
import { ArrowRight, MessageCircle } from 'lucide-react';
import Button from '../Button';
import { SIGNUP_URL, whatsappLink } from '../../lib/links';

interface ToolCtaProps {
  title: string;
  text: string;
  /** Message typed in WhatsApp for the person: their simulated case, in their words. */
  whatsappText: string;
}

const ToolCta: React.FC<ToolCtaProps> = ({ title, text, whatsappText }) => (
  <>
    <p className="text-[15px] text-ink-soft">
      <span className="font-semibold text-ink">{title}</span> {text}
    </p>
    <div className="flex shrink-0 flex-wrap gap-2">
      <Button href={whatsappLink(whatsappText)} external variant="accent">
        <MessageCircle size={16} />
        Falar com a contadora
      </Button>
      <Button href={SIGNUP_URL} variant="secondary">
        Começar agora
        <ArrowRight size={16} />
      </Button>
    </div>
  </>
);

export default ToolCta;
