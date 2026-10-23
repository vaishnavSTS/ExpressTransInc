export interface PostalAddress {
  street: string;
  city: string;
  region: string;
  regionName: string;
  postalCode: string;
  country: string;
}

export interface SourceReference {
  label: string;
  url: string;
  /** ISO date (YYYY-MM-DD) the source was last checked. */
  checkedOn: string;
}

export interface CompanyInfo {
  legalName: string;
  /** Short display name used in copy. */
  displayName: string;
  usdotNumber: string;
  mcNumber: string;
  /** E.164 format, for tel: links and structured data. */
  phoneE164: string;
  phoneDisplay: string;
  address: PostalAddress;
  /**
   * The registered address appears on the public FMCSA record. Set to false to show
   * only city/state on the site if the owner prefers not to publish the street address.
   */
  showStreetAddress: boolean;
  /** Public business email. null until the owner approves one for publication. */
  email: string | null;
  /** Verified social profile URLs. Empty until confirmed by the owner. */
  socialProfiles: string[];
  carrierOperation: string;
  operationClassification: string;
  /** Operating authority status exactly as shown on the FMCSA snapshot. */
  authorityStatus: string;
  /** Cargo classifications checked on the FMCSA record. */
  cargoClassifications: string[];
  fmcsaSnapshotUrl: string;
  sources: SourceReference[];
}
