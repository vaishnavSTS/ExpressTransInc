import type { CompanyInfo } from '../types/company';

/**
 * Single source of truth for public company facts.
 *
 * Every value here was checked against the official FMCSA record on the date in
 * `sources`. See docs/company-research.md for the full research log, conflicts and
 * open questions. Do not add facts (hours, email, fleet size, service areas, etc.)
 * without a verifiable source or the owner's written approval.
 */
export const company: CompanyInfo = {
  legalName: 'XPRESS TRANS INC',
  displayName: 'XPRESS TRANS INC',
  usdotNumber: '2576898',
  mcNumber: 'MC-901483',
  phoneE164: '+12096221223',
  phoneDisplay: '(209) 622-1223',
  address: {
    street: '1509 Hunt Master Ct',
    city: 'Hughson',
    region: 'CA',
    regionName: 'California',
    postalCode: '95326',
    country: 'US',
  },
  // OWNER REVIEW: the registered address appears to be on a residential street.
  // Confirm the owner is comfortable publishing it; set to false to show city/state only.
  showStreetAddress: true,
  // OWNER REVIEW: the FMCSA census lists a contact email, but it has not been approved
  // for publication on the website. Leave null until the owner confirms one.
  email: null,
  socialProfiles: [],
  carrierOperation: 'Interstate',
  operationClassification: 'Authorized for hire',
  authorityStatus: 'Authorized for Property (except household goods)',
  cargoClassifications: ['General Freight', 'Intermodal Containers'],
  fmcsaSnapshotUrl:
    'https://safer.fmcsa.dot.gov/query.asp?query_param=USDOT&query_string=2576898&query_type=queryCarrierSnapshot&searchtype=ANY',
  sources: [
    {
      label: 'FMCSA SAFER Company Snapshot (information current as of 10/21/2026)',
      url: 'https://safer.fmcsa.dot.gov/query.asp?query_param=USDOT&query_string=2576898&query_type=queryCarrierSnapshot&searchtype=ANY',
      checkedOn: '2026-10-23',
    },
  ],
};

/** Human-readable date for "as of" statements about the FMCSA record. */
export const fmcsaRecordAsOf = 'October 21, 2026';

export const formatAddressLine = (withStreet = company.showStreetAddress): string => {
  const { street, city, region, postalCode } = company.address;
  return withStreet ? `${street}, ${city}, ${region} ${postalCode}` : `${city}, ${region}`;
};

export const telHref = `tel:${company.phoneE164}`;
