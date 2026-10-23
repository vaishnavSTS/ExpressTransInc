import { company } from './company';

export interface FAQItem {
  question: string;
  answer: string;
}

/**
 * Answers deliberately avoid promises about lanes, transit times, pricing or response
 * times that have not been confirmed by the owner.
 */
export const faqs: FAQItem[] = [
  {
    question: 'How do I request a freight quote?',
    answer: `Use the quote request form on our Contact page or call ${company.phoneDisplay}. Include your pickup and delivery locations, a description of the freight and when it needs to move. The more detail you share, the more useful our response can be.`,
  },
  {
    question: 'What types of freight do you handle?',
    answer:
      'Our FMCSA carrier record lists general freight and intermodal containers. If your shipment falls outside those categories, or you are not sure, ask us and we will tell you directly whether we can help.',
  },
  {
    question: 'Where do you operate?',
    answer: `We are based in ${company.address.city}, ${company.address.regionName}, and registered with FMCSA as an interstate carrier. Lanes are confirmed shipment by shipment, so tell us your origin and destination and we will let you know whether we can serve them.`,
  },
  {
    question: 'Can I book a shipment or get an instant price online?',
    answer:
      'No. The online form sends us your shipment details so we can review them and follow up with you. Pricing depends on the specifics of each load, so we discuss it after reviewing your request.',
  },
  {
    question: 'How can I verify your operating authority?',
    answer: `Our USDOT number is ${company.usdotNumber} and our docket number is ${company.mcNumber}. You can look up our current registration, operating authority and safety information on the FMCSA SAFER website at any time.`,
  },
  {
    question: 'What information should I have ready before I contact you?',
    answer:
      'Pickup and delivery city and state, what the freight is and how it is packaged, approximate weight, the date it will be ready and any appointment or handling requirements. For container moves, include the container size and pickup or return location if you know them.',
  },
];
