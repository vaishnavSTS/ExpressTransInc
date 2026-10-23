import { Link } from 'react-router';
import { PageHeader } from '../components/layout/PageHeader';
import { SEOHead } from '../components/seo/SEOHead';
import { Container } from '../components/ui/Container';
import { siteConfig } from '../config/site';
import { company, formatAddressLine, telHref } from '../data/company';
import { privacyConfig } from '../data/privacy';
import { routes } from '../data/routes';

function ProviderName({ provider, fallback }: { provider: { name: string; privacyUrl: string } | null; fallback: string }) {
  if (!provider) return <>{fallback}</>;
  return (
    <>
      {provider.name} (
      <a href={provider.privacyUrl} target="_blank" rel="noopener noreferrer">
        privacy policy<span className="sr-only"> (opens in a new tab)</span>
      </a>
      )
    </>
  );
}

export function PrivacyPolicyPage() {
  const formLive = siteConfig.quoteEndpoint !== null;
  return (
    <>
      <SEOHead route={routes.privacy} />
      <PageHeader title="Privacy Policy" crumb="Privacy Policy" intro={`Last updated: ${privacyConfig.lastUpdated}`} />

      <section className="py-16 sm:py-20">
        <Container>
          <div className="prose-legal max-w-3xl text-lg">
            <p>
              This policy explains what information the {company.legalName} website collects, how we use it and the
              choices you have. It applies to this website only, not to information shared with us by phone or in
              the course of providing transportation services.
            </p>

            <h2>Information you give us</h2>
            <p>
              When you submit our quote request form, we collect the information you enter: your name, company name,
              email address, phone number, pickup and delivery locations, requested service, freight description,
              estimated ship date, any additional notes, and your confirmation that you have read this policy.
            </p>
            {!formLive && (
              <p>
                <strong>Current status:</strong> the online quote form is not yet connected to a delivery service, so
                no form information is currently transmitted or collected through this website.
              </p>
            )}
            <p>Please do not include sensitive personal information in the form; it is not needed for a quote.</p>

            <h2>Information collected automatically</h2>
            <p>
              This website does not use cookies, analytics, advertising trackers or third-party scripts. Fonts and
              images are served from the same host as the site. Like most websites, the company that hosts this site,{' '}
              <ProviderName provider={privacyConfig.hostingProvider} fallback="our hosting provider" />, may
              automatically record technical information such as your IP address, browser type, the pages requested
              and the time of the request in server logs used to operate and secure the service.
            </p>
            <p>
              The site does not store the contents of the quote form in your browser&rsquo;s local storage or
              cookies.
            </p>

            <h2>How we use information</h2>
            <ul>
              <li>To review and respond to your quote request or inquiry.</li>
              <li>To contact you about the shipment you asked about.</li>
              <li>To keep ordinary business records of inquiries.</li>
              <li>To protect the website against spam and misuse.</li>
            </ul>
            <p>We do not sell your personal information or use it for third-party advertising.</p>

            <h2>Who we share it with</h2>
            <p>
              Quote requests are transmitted through{' '}
              <ProviderName provider={privacyConfig.formProcessor} fallback="a third-party form processing service" />,
              which receives the submission and delivers it to us. Service providers such as our form processor and
              website host process information on our behalf to provide their services. We may also disclose
              information if required by law.
            </p>

            <h2>How long we keep it</h2>
            <p>{privacyConfig.retention}</p>

            <h2>Security</h2>
            <p>
              Form submissions are sent over an encrypted (HTTPS) connection. No method of transmission or storage is
              completely secure, but we take reasonable steps to protect the information you send us.
            </p>

            <h2>Your choices</h2>
            <p>
              You can choose not to submit the form and contact us by phone instead. To ask what information we hold
              about you from this website, or to ask us to correct or delete it, contact us using the details below.
              Depending on where you live, you may have additional rights under applicable privacy laws.
            </p>

            <h2>Children</h2>
            <p>This website is intended for businesses and is not directed to children under 13.</p>

            <h2>Links to other websites</h2>
            <p>
              This site links to external websites, such as the FMCSA SAFER system. Their privacy practices are
              governed by their own policies.
            </p>

            <h2>Changes to this policy</h2>
            <p>We may update this policy from time to time. The date at the top shows when it was last changed.</p>

            <h2>Contact us</h2>
            <p>
              {company.legalName}
              <br />
              {formatAddressLine(true)}
              <br />
              Phone: <a href={telHref}>{company.phoneDisplay}</a>
            </p>
            <p>
              <Link to="/contact">Go to the contact page</Link>
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
