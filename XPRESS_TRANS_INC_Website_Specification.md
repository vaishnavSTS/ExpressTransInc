# XPRESS TRANS INC — Website Development Specification & Claude Code Prompt

## Instructions to Claude

Act as a senior frontend engineer, UI/UX designer, technical SEO specialist, and conversion-focused web developer. Build a complete, polished, responsive website for **XPRESS TRANS INC**, using **React, TypeScript, and Tailwind CSS**.

This document is the project specification. Follow it as the source of truth. Inspect the repository before making changes, research the company using the sources below, and implement the site—not just a plan or mockup. Do not invent business facts. If the company identity or a critical public-facing fact is uncertain, leave it configurable and flag it for confirmation.

## 1. Project goals

Create a professional transportation/trucking company website that:

- Looks polished, credible, and established.
- Uses the WordPress “Trucking Company” theme as a structural and visual reference, without copying its branding, proprietary assets, or text: https://it.wordpress.org/themes/trucking-company/
- Generates qualified business inquiries through clear contact and quote-request calls to action.
- Works well on mobile, tablet, and desktop.
- Follows modern technical, on-page, local, and content SEO best practices.
- Is accessible, fast, maintainable, and ready for deployment after configuration.
- Uses accurate, verified company information only.

Do not stop after providing a plan. Complete the implementation, run the available checks, fix issues, and report the results honestly.

## 2. Confirmed company identity and research

The intended company is the California carrier associated with **USDOT 2576898**.

### Initial company details

- Legal name: XPRESS TRANS INC
- USDOT: 2576898
- MC number: MC-901483
- Registered address: 1509 Hunt Master Ct, Hughson, CA 95326
- Publicly listed phone: (209) 622-1223
- FMCSA Company Snapshot: https://safer.fmcsa.dot.gov/query.asp?query_param=USDOT&query_string=2576898&query_type=queryCarrierSnapshot&searchtype=ANY
- A public FMCSA snapshot has listed cargo categories including General Freight and Intermodal Containers.
- The carrier is listed as interstate.
- An October 2025 filing reported 5 power units and 4 drivers. Treat these as historical figures, not necessarily current.

### Mandatory verification

Before publishing the company details:

1. Re-open the official FMCSA record and verify the latest available information.
2. Verify operating authority and insurance status against current official records. Do not infer authority status from USDOT registration alone.
3. Confirm the phone and address with the company owner or another reliable current source if possible.
4. Inspect https://xpresstransinc.com if accessible, but do not assume it belongs to this exact carrier until the identity is confirmed.
5. Search for official company pages and reputable public directories. Prefer official and primary sources.
6. Record facts, source URLs, and verification dates in a research note, for example `docs/company-research.md`.

If any details conflict, do not silently choose one. Flag the discrepancy and keep the affected value configurable.

### Facts that must not be invented

Do not fabricate or assume:

- Official email address or social media profiles.
- Company history, founding date, mission, or ownership.
- Current fleet size, driver count, equipment types, or capacity.
- Customer names, logos, reviews, testimonials, awards, or ratings.
- Safety ratings, certifications, insurance limits, authority status, or compliance claims.
- Nationwide service, specific routes, cities served, or delivery guarantees.
- 24/7 availability, on-time percentages, prices, or quote turnaround times.

The exact service offering, target customer, service area, official domain, logo, and business email may need owner confirmation. Make them easy to update centrally. If critical information is unknown, use a clearly marked internal placeholder or omit the claim from the public page.

## 3. Required technology stack

Use:

- React
- TypeScript with strict type checking
- Tailwind CSS
- Vite unless the existing repository already uses a suitable build system
- Lucide React for icons
- React Router only if needed for multiple routes
- A suitable, maintained approach to page metadata and structured data
- A form validation approach appropriate to the project

First inspect the existing repository, `package.json`, scripts, dependencies, and project documentation. Preserve working project conventions where sensible. Do not replace the requested stack with WordPress, Vue, or another framework. Do not introduce unnecessary dependencies.

For SEO-critical content, evaluate prerendering or static generation so crawlers can reliably access meaningful HTML and page metadata. Do not claim that client-only metadata is sufficient without evaluating the actual deployment setup.

## 4. Visual design direction

Use the referenced Trucking Company theme for inspiration: transportation-focused layouts, prominent imagery, service cards, company introduction, strong CTAs, contact details, and a substantial footer.

### Suggested design tokens

- Deep navy: `#10243A`
- Secondary slate blue: `#344B62`
- Transportation orange accent: `#F28C28`
- White and light neutral backgrounds
- Dark charcoal body text
- Muted gray supporting text
- Subtle neutral borders

These are starting points, not mandatory brand colors. If an authentic logo or established brand identity is found, adapt the palette to it.

### Design standards

- Professional, modern, confident, and uncluttered.
- Clear hierarchy, generous whitespace, consistent spacing, and strong typography.
- High-quality transportation imagery and carefully composed layouts.
- Readable text over hero photography with accessible contrast.
- Consistent button, card, form, and section-heading styles.
- Subtle hover and entrance effects only where they improve usability.
- No excessive gradients, glassmorphism, animation, oversized decorative blobs, or generic AI-template appearance.
- No horizontal overflow at common viewport sizes.
- Use an authentic company logo if available. Otherwise create a clearly treated text-based wordmark; do not represent an invented mark as the official logo.

Use properly licensed stock imagery or authentic company assets. Do not present stock photographs as XPRESS TRANS INC’s own trucks, drivers, or facilities. Optimize images and provide meaningful alt text for informative images.

## 5. Website structure and navigation

Build a coherent website with these recommended routes:

- `/` — Home
- `/about` — About the Company
- `/services` — Services
- `/contact` — Contact / Request a Quote
- `/privacy-policy` — Privacy Policy matching the actual data collection

A simpler single-page MVP is acceptable if repository constraints or verified content make it appropriate, but organize the code so separate pages can be added cleanly. Do not create thin, repetitive pages merely to increase page count.

### Header

- Company wordmark or logo.
- Home, About, Services, and Contact navigation.
- A prominent “Request a Quote” CTA.
- Mobile menu with keyboard support, correct focus behavior, and accessible labels.
- Optional compact contact strip if it adds value.
- Sticky behavior only if it does not harm usability.

### Homepage sections

Implement these sections in a logical, conversion-focused order. Adapt or omit a section if there is no factual basis for it.

1. **Hero**
   - Strong H1 describing the actual business and verified offering.
   - Short, clear supporting text.
   - Primary “Request a Quote” CTA.
   - Secondary “Contact Us” or verified click-to-call CTA.
   - High-quality freight/truck image.
   - Mobile-friendly layout and readable contrast.
   - Draft headline direction: “Reliable Freight Transportation for Your Business.” Treat this as editable marketing copy, not a verified company slogan.

2. **Trust / capabilities strip**
   - Use verified business facts only.
   - Potential facts include service categories, registered location, or confirmed capabilities.
   - Do not publish stale fleet counts or unsupported claims.
   - If there are too few facts, use a simple benefits strip without numerical statistics.

3. **Company introduction**
   - Clear overview of who the company is and what it offers.
   - Explain its approach to service and communication without inventing history.
   - Link to the About page.

4. **Services**
   - Attractive reusable service cards, each with a suitable icon or image, short description, and CTA.
   - General freight and intermodal container transportation are research leads from the public carrier record; confirm the precise services with the business before making detailed promises.
   - Do not assume dry van, refrigerated, flatbed, hazardous materials, expedited, LTL, dedicated, brokerage, warehousing, or international services without verification.

5. **Why choose XPRESS TRANS INC**
   - Use a clean image-and-text layout.
   - Describe only credible, supportable benefits such as clear communication or attention to shipment requirements.
   - Do not claim industry leadership or guaranteed outcomes without evidence.

6. **How it works**
   - Explain a realistic inquiry process, such as submitting shipment details, discussing requirements, receiving a response, and coordinating the shipment.
   - Do not imply online booking or instant quotes unless actually implemented.

7. **Service area / coverage**
   - Use only verified service locations or routes.
   - Interstate registration alone does not prove nationwide service.
   - If coverage is unknown, omit a map and use a general capabilities section instead.
   - Do not create location pages for places the company does not serve.

8. **Fleet / operations**
   - Include only if useful and supported by verified facts.
   - Do not show stock images as the company’s actual fleet.
   - Do not publish unconfirmed equipment types or fleet statistics.

9. **Testimonials / reviews**
   - Only use genuine, authorized, attributable reviews.
   - Never fabricate names, quotes, ratings, or customer logos.
   - If no verified reviews exist, replace the section with useful FAQs or service-process content.

10. **Frequently asked questions**
    - Answer useful customer questions about quote requests, shipment requirements, verified service types, service areas, and contact methods.
    - Do not give definitive answers for unconfirmed services or locations.
    - Avoid repetitive FAQ copy created only to target keywords.

11. **Final CTA**
    - Strong, accessible section encouraging prospective customers to discuss freight requirements or request a quote.

12. **Footer**
    - Company name and approved branding.
    - Verified contact details.
    - Navigation and service links.
    - Privacy Policy.
    - Official regulatory links where useful.
    - Dynamic copyright year.
    - No fabricated hours, emails, social accounts, or office locations.

### About page

Include a concise, factual company overview, service philosophy, verified capabilities, and a clear CTA. Do not invent the founding story, leadership biographies, or company milestones.

### Services page

Explain only the confirmed service offerings. Give each service enough unique detail to help a potential customer decide whether to inquire. Avoid duplicate pages and unsupported service promises.

### Contact page

Display verified contact methods and a quote-request form. Make the phone number clickable using `tel:+12096221223` only after confirming it remains correct. Do not invent an email address or business hours.

### Privacy Policy

The policy must reflect the actual data collected, processing, third-party providers, retention practices, and contact method. Do not claim legal compliance that has not been assessed. Mark any company-specific legal details that require review.

## 6. Quote-request form and functionality

Create a professional, responsive quote form. Candidate fields:

- Full name
- Company name
- Business email
- Phone number
- Origin city and state
- Destination city and state
- Freight / shipment description
- Requested service or equipment, with options based on confirmed offerings
- Estimated shipment date
- Additional notes
- Appropriate privacy notice acknowledgment or consent, where legally and operationally appropriate

Requirements:

- Correct labels and accessible validation messages.
- Required-field checks and sensible email/phone validation.
- Clear loading, success, and failure states.
- Prevent accidental duplicate submissions.
- Keyboard and screen-reader usability.
- Responsive layout.
- No logging sensitive form data to the browser console.
- Do not save personal form submissions in `localStorage`.
- Never expose email provider secrets or private API keys in frontend code.

**Important:** A form that only runs in the browser does not send an inquiry. Inspect the repository for an existing backend or integration. If one exists, integrate with it appropriately. If none exists, implement the UI and a typed submission interface, document the required endpoint/provider and environment variables, and clearly mark the form as not live until a real submission path has been configured and tested. Never show a false success message when no submission occurred.

## 7. SEO requirements

SEO is a core acceptance requirement.

### Technical SEO

- Unique title and meta description per indexable route.
- Clear H1 and logical H2/H3 hierarchy.
- Semantic HTML5.
- Crawlable internal links and sensible URL paths.
- Canonical URLs based on the verified production domain; do not guess the domain.
- XML sitemap containing canonical, indexable production URLs only.
- Appropriate `robots.txt`.
- Correct handling of unknown routes and broken URLs.
- Prevent accidental indexing of staging URLs and duplicate pages.
- Open Graph and social sharing metadata.
- Correct document language.
- Descriptive, useful image alt text.
- Optimized images, dimensions, and loading behavior.
- No broken links, missing assets, or duplicate page titles.
- Ensure SEO-critical content is rendered in a way search engines can reliably access.

### Structured data

Implement appropriate JSON-LD based only on verified visible content. Consider:

- `Organization` or the most specific accurate `LocalBusiness` subtype.
- `WebSite`.
- `BreadcrumbList` for nested pages.
- `Service` where appropriate and supported.

Do not invent addresses, phone numbers, opening hours, social profiles, ratings, reviews, service areas, or awards. Do not add unsupported markup to chase rich results.

### Keyword research and content strategy

Research actual search intent around the company and verified offering. Candidate keyword themes to validate:

- XPRESS TRANS INC
- Trucking company in Hughson, California
- Freight transportation in the confirmed service area
- General freight transportation
- Intermodal container transportation
- Freight quote / transportation quote

Use keywords naturally in page titles, headings, intro copy, service descriptions, internal links, and useful FAQs. Do not keyword-stuff or generate city doorway pages.

Use a distinct purpose and unique content for every page. Do not promise Google rankings or guaranteed SEO results.

### Local SEO

- Use Hughson, California as the registered location, subject to current verification.
- Maintain consistent company name, address, and phone details.
- Link to a business profile only after confirming it belongs to this exact company.
- Do not invent additional locations or claim the company serves every nearby city.
- If local service details are not confirmed, do not create unsupported location landing pages.

## 8. Performance, accessibility, and UX

Target strong real-world Core Web Vitals and Lighthouse results. Do not claim scores unless measured.

Implement:

- Mobile-first responsive layouts.
- Appropriate image formats and sizes.
- Lazy loading for below-the-fold imagery.
- Explicit image dimensions or aspect ratios to reduce layout shift.
- Limited third-party scripts.
- Minimal unnecessary JavaScript.
- No autoplaying video with sound.
- Accessible color contrast.
- Visible focus indicators.
- Keyboard-operable navigation and forms.
- Semantic buttons and links.
- Proper form labels and error associations.
- Reduced-motion support.
- Appropriate ARIA only where needed.
- No horizontal overflow.
- Clear CTA hierarchy and usable touch targets.

## 9. Code organization

Adapt this example to the existing repository; do not create unnecessary files just to match it.

```text
src/
  components/
    layout/
      Header.tsx
      Footer.tsx
      MobileNavigation.tsx
    home/
      HeroSection.tsx
      TrustSection.tsx
      AboutSection.tsx
      ServicesSection.tsx
      WhyChooseUsSection.tsx
      ProcessSection.tsx
      CoverageSection.tsx
      FAQSection.tsx
      CTASection.tsx
    forms/
      QuoteRequestForm.tsx
    seo/
      SEOHead.tsx
      StructuredData.tsx
    ui/
      Button.tsx
      Container.tsx
      SectionHeading.tsx
  pages/
    HomePage.tsx
    AboutPage.tsx
    ServicesPage.tsx
    ContactPage.tsx
    PrivacyPolicyPage.tsx
    NotFoundPage.tsx
  data/
    company.ts
    services.ts
    faq.ts
  types/
    company.ts
    quote.ts
  lib/
    validation.ts
  styles/
    index.css
docs/
  company-research.md
```

Use strict TypeScript. Centralize editable company details in a typed `company.ts` configuration. Keep repeated services, FAQs, and navigation data separate from presentation components. Use environment variables for deployment-specific values. Avoid `any`, duplicated layout logic, giant components, and unnecessary abstractions.

## 10. Copywriting standards

Write original, clear copy for the actual audience of the verified company.

Use:
- Direct headlines.
- Concise paragraphs.
- Specific, credible benefits.
- Consistent terminology.
- Useful service explanations.
- Clear calls to action.

Avoid:
- Generic AI-sounding copy.
- Excessive exclamation marks.
- Repetitive filler.
- Unsupported “industry-leading” or “best in the country” claims.
- Fake statistics, testimonials, certifications, safety claims, or guarantees.
- Claims of instant quotes, real-time tracking, or online booking unless implemented.

The website should communicate professionalism, operational competence, and ease of contacting the company.

## 11. Required workflow

### Phase 1 — Inspect and research
- Inspect the repository, package files, scripts, and existing docs.
- Verify the company against current official sources.
- Inspect the existing domain and public presence where possible.
- Document verified facts, conflicts, and open questions in `docs/company-research.md`.
- Ask me only if an unresolved fact is essential to avoid building the wrong site or publishing misleading information.

### Phase 2 — Plan
- Establish design tokens and responsive layout.
- Decide page structure and routing.
- Define reusable components.
- Plan metadata, structured data, sitemap, and robots rules.
- Identify form backend requirements and environment variables.

### Phase 3 — Implement
- Build the full responsive website.
- Implement all applicable page sections and routes.
- Add verified copy and licensed/approved imagery.
- Implement functional navigation, CTA links, and form validation.
- Add SEO metadata, structured data, sitemap, and robots.txt as appropriate.
- Ensure no unverified company information is scattered throughout the codebase.

### Phase 4 — Validate
- Install dependencies using the existing package manager.
- Run TypeScript checks.
- Run linting if configured.
- Run a production build.
- Fix build errors and relevant warnings.
- Test routes and navigation.
- Test mobile menu interactions.
- Test form validation and all actual submission states.
- Verify titles, descriptions, canonical URLs, sitemap, robots rules, and structured data.
- Check responsive layouts at mobile, tablet, and desktop widths.
- Check keyboard access and focus states.
- Check links, images, and horizontal overflow.
- Use browser automation if available; otherwise perform the checks the environment supports.

### Phase 5 — Final report
At completion, report:
1. What was built.
2. Pages and sections implemented.
3. Company facts verified and sources used.
4. Any remaining placeholders or facts needing owner approval.
5. Form backend and environment setup still required.
6. Commands to run locally.
7. Build and test results, including anything not tested.
8. Remaining deployment and SEO tasks.

Do not claim a test passed unless you ran it. Do not claim the form is live unless real submission was verified.

## 12. Acceptance criteria

The implementation is complete when:

- It uses React, TypeScript, and Tailwind CSS.
- The design is professional, trucking-industry appropriate, and inspired by the provided reference.
- It is responsive on mobile, tablet, and desktop.
- Navigation and CTAs have meaningful behavior.
- Public company facts are accurate and belong to USDOT 2576898.
- Unverified details are omitted, clearly flagged, or configurable.
- The quote form validates input and accurately communicates submission status.
- SEO metadata and structured data are appropriate and factually grounded.
- Sitemap and robots rules are implemented appropriately for the deployment.
- Images are optimized and responsibly sourced.
- There are no known build-breaking errors.
- Major routes, interactions, and accessibility issues have been checked.
- Local development and deployment instructions are documented.

**Begin by inspecting the repository and verifying XPRESS TRANS INC (USDOT 2576898). Then implement the website end-to-end. Do not stop at a proposal or wireframe.**
