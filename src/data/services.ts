import { images, type SiteImage } from './images';

export type ServiceId = 'general-freight' | 'intermodal-containers';

export interface Service {
  id: ServiceId;
  name: string;
  /** One-sentence summary used on cards. */
  summary: string;
  /** Longer explanation for the Services page. */
  description: string[];
  /** Details a shipper should have ready when asking about this service. */
  detailsToShare: string[];
  image: SiteImage;
}

/**
 * Services are based on the cargo classifications checked on the carrier's FMCSA
 * record (General Freight, Intermodal Containers).
 *
 * OWNER REVIEW: confirm the exact offering (equipment types, container sizes, port or
 * rail ramp work, lanes) before adding any detail here. Do not add dry van, reefer,
 * flatbed, hazmat, LTL, expedited or brokerage services without confirmation.
 */
export const services: Service[] = [
  {
    id: 'general-freight',
    name: 'General Freight Transportation',
    summary:
      'Over-the-road transportation of general commodities for businesses that need a for-hire carrier.',
    description: [
      'General freight covers the everyday commodities businesses ship: packaged goods, palletized products, materials and other cargo that does not require special handling or permits.',
      'Because every load is different, we start by understanding your freight — what it is, how it is packaged, where it is going and when it needs to move — so we can tell you plainly whether it is a good fit for us.',
    ],
    detailsToShare: [
      'Pickup and delivery city and state',
      'Commodity description and packaging (pallets, crates, loose)',
      'Approximate weight and number of pieces',
      'Ready date and any delivery appointment',
      'Loading or unloading requirements at either end',
    ],
    image: images.openRoad,
  },
  {
    id: 'intermodal-containers',
    name: 'Intermodal Container Transportation',
    summary:
      'Over-the-road movement of intermodal shipping containers between facilities.',
    description: [
      'Intermodal containers are designed to move between ships, rail and trucks without unloading the cargo inside. The trucking leg moves the container over the road to or from the point where it changes mode, or on to its final destination.',
      'Container moves involve details beyond the freight itself, such as container size, weight and the pickup or return location. Share what you know and we will work through the requirements with you.',
    ],
    detailsToShare: [
      'Container size and type, if known',
      'Pickup location and delivery or return location',
      'Approximate gross weight of the loaded container',
      'Container availability date and any deadlines',
      'Reference numbers you have for the move',
    ],
    image: images.intermodal,
  },
];

/** Options for the quote form's service select. */
export const serviceOptions = [
  ...services.map((s) => ({ value: s.id, label: s.name })),
  { value: 'not-sure', label: 'Not sure / something else' },
] as const;
