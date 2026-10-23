import { ChevronDown } from 'lucide-react';
import type { FAQItem } from '../../data/faq';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';

interface FAQSectionProps {
  items: FAQItem[];
  title?: string;
  intro?: string;
}

/** Native <details>/<summary> accordion: keyboard accessible and crawlable without JS. */
export function FAQSection({ items, title = 'Frequently asked questions', intro }: FAQSectionProps) {
  return (
    <section className="py-20 sm:py-28" aria-labelledby="faq-heading">
      <Container className="grid gap-12 lg:grid-cols-[1fr_2fr]">
        <SectionHeading id="faq-heading" eyebrow="FAQ" title={title} intro={intro} />
        <div className="divide-y divide-line border-y border-line">
          {items.map((item) => (
            <details key={item.question} className="group py-2">
              <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 py-3 text-lg font-semibold text-navy-900 [&::-webkit-details-marker]:hidden">
                <h3 className="text-lg font-semibold">{item.question}</h3>
                <ChevronDown
                  className="size-5 shrink-0 text-accent-ink transition-transform group-open:rotate-180"
                  aria-hidden="true"
                />
              </summary>
              <p className="pb-4 text-muted">{item.answer}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
