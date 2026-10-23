# XPRESS TRANS INC — Company Research Log

Research performed **2026-10-23**. All public-facing company facts on the site come from
`src/data/company.ts`, which must stay in sync with this note.

## 1. Verified facts (official FMCSA sources)

| Fact | Value | Source | Checked |
|---|---|---|---|
| Legal name | XPRESS TRANS INC | SAFER snapshot; FMCSA Company Census | 2026-10-23 |
| DBA name | none listed | SAFER snapshot | 2026-10-23 |
| Entity type | Carrier/Shipper ("C;S" in census) | SAFER snapshot; census | 2026-10-23 |
| USDOT number | 2576898 | SAFER snapshot | 2026-10-23 |
| USDOT status | ACTIVE, no out-of-service date | SAFER snapshot | 2026-10-23 |
| Docket | MC-901483 (docket status code A) | SAFER snapshot; census | 2026-10-23 |
| Operating authority status | "AUTHORIZED FOR Motor Carrier of Property (except Household Goods)" | SAFER snapshot | 2026-10-23 |
| Operation classification | Authorized for hire | SAFER snapshot | 2026-10-23 |
| Carrier operation | Interstate | SAFER snapshot | 2026-10-23 |
| Cargo classifications | General Freight; Intermodal Containers | SAFER snapshot; census | 2026-10-23 |
| Physical & mailing address | 1509 Hunt Master Ct, Hughson, CA 95326 (county FIPS 099 = Stanislaus County) | SAFER snapshot; census | 2026-10-23 |
| Phone | (209) 622-1223 | SAFER snapshot; census | 2026-10-23 |
| Safety rating | None (non-ratable; review date 08/24/2023) | SAFER snapshot | 2026-10-23 |

The SAFER snapshot states **"Information current as of 10/21/2026."**

### Sources

- FMCSA SAFER Company Snapshot:
  https://safer.fmcsa.dot.gov/query.asp?query_param=USDOT&query_string=2576898&query_type=queryCarrierSnapshot&searchtype=ANY
- FMCSA Company Census File (DOT open data, dataset `az4n-8mr2`):
  https://data.transportation.gov/resource/az4n-8mr2.json?dot_number=2576898
- FMCSA "Insur – All With History" (dataset `ypjt-5ydn`), "ActPendInsur – All With History"
  (`qh9u-swkp`) and "InsHist – All With History" (`6sqe-dvqs`), queried for docket MC901483.

## 2. Historical / not published on the site

These are filing data, not current facts, and are deliberately **not** shown on the website:

- MCS-150 form date 10/07/2025: 5 power units, 4 drivers (all interstate, within 100 air miles),
  5 owned tractors, 8 owned trailers; 213,654 miles reported for 2024.
- USDOT record added 2015-02-02. This is a registration date, not a founding date — do not
  use it as "established/since" without the owner's confirmation.
- Inspections (24 months to 10/21/2026): 2 vehicle / 2 driver, 0 out-of-service. Crashes: 1 tow-away, 0 injury, 0 fatal.

## 3. Insurance status — needs confirmation

The official L&I site (li-public.fmcsa.dot.gov) is protected by reCAPTCHA and could not be
queried automatically. The DOT open-data mirrors show:

- **Current insurance file (`ypjt-5ydn`)**: BIPD primary, Hudson Insurance Company, policy
  BUI-012184, effective 05/20/2022, $1,000K coverage. No cancellation listed.
- **Active/pending file (`qh9u-swkp`)**: the same policy, but with a `cancl_effective_date` of
  **05/20/2026** — a date that has already passed.

These records conflict. SAFER still showed authority as "Authorized" on 10/21/2026, which
suggests required insurance remains on file, but **this has not been verified**. The website
makes **no insurance claims**. To confirm, check L&I by hand at
https://li-public.fmcsa.dot.gov (search USDOT 2576898 → "Active/Pending Insurance").

## 4. Domain and online presence

- `xpresstransinc.com` resolves in DNS (216.21.239.197), but HTTPS connections were refused and
  HTTP timed out on 2026-10-23. Its ownership and its link to this carrier are **unconfirmed**,
  so it is **not** used as the canonical domain. The production URL is set through the
  `VITE_SITE_URL` env var once confirmed.
- No official website, logo, social profiles or Google Business Profile could be confirmed.
- Third-party directories (carrieratlas.com, carriersource.io) repeat FMCSA data. Their
  figures disagree with each other (e.g., driver counts) and were not used as sources.
- Same/similar names that are **different companies**: XPRESS TRANS INC, Melrose Park, IL
  (USDOT 2038003); Trans Xpress Line Inc, Bakersfield, CA (USDOT 1626632). Do not mix them up.

## 5. Discrepancies and owner decisions needed

| # | Item | Status / action |
|---|---|---|
| 1 | Insurance: active vs. pending datasets conflict (see §3) | Verify on L&I. The site makes no insurance claim. |
| 2 | Registered address looks residential | Owner to confirm it can be published; set `showStreetAddress: false` in `company.ts` to show city/state only. |
| 3 | Email | The FMCSA census lists a Yahoo address. **Not published.** Owner to supply an approved business email (`company.email`). |
| 4 | Phone | Matches SAFER and census as of 10/21/2026. Owner to confirm it is still the right number for customer inquiries. |
| 5 | Exact services, equipment, lanes, service area | Only the FMCSA cargo classifications are used. Owner to confirm details (container sizes, port/rail work, equipment) before adding them. |
| 6 | Production domain | Unconfirmed (see §4). |
| 7 | Logo / brand | None found. A text wordmark is used and should not be treated as an official logo. |
| 8 | Marketing copy ("Why choose us", About principles) | Written as an approach, not guarantees. Owner to confirm it reflects actual practice. |
| 9 | Privacy policy provider names and retention period | See `src/data/privacy.ts`. Needs owner and legal review. |
| 10 | Homepage registration strip (USDOT / MC / Interstate / Hughson cards) | Removed and then restored at the owner's request on 2026-10-23. Shown on the homepage below the hero. |
| 11 | Owner-supplied About copy (2026-10-23) | Added to the About page and homepage About section. Owner claims taken as given: drop-and-hook trailer service, "modern" power units, local work, dry freight. Adjusted because they conflict with FMCSA data: (a) "OOS rates well below national averages across vehicle, driver, and hazardous materials" — SAFER shows 2 vehicle / 2 driver inspections, 0 OOS (national avg 22.26% / 6.67% as of 09/25/2026), but **0 hazmat inspections** and census `hm_ind = N`, so the hazmat claim was dropped and the claim restated as zero OOS orders; (b) "regulated cargo" → "time-sensitive loads" (implies hazmat); (c) "long-haul interstate lanes" → "interstate lanes", because MCS-150 (10/07/2025) reports all 4 drivers interstate **within** 100 air miles, 0 beyond. Restore the original wording only if the owner confirms and the FMCSA record is updated. |

## 6. Keyword themes (for content, not keyword stuffing)

Used naturally in titles, headings and copy: "XPRESS TRANS INC"; "trucking company in Hughson,
CA"; "general freight transportation"; "intermodal container transportation / trucking";
"freight quote". No search-volume tools were available, so these were not validated with
volume data. No city doorway pages were created, because the service area is unconfirmed.
