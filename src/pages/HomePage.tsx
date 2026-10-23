import { AboutSection } from '../components/home/AboutSection';
import { CoverageSection } from '../components/home/CoverageSection';
import { CTASection } from '../components/home/CTASection';
import { FAQSection } from '../components/home/FAQSection';
import { HeroSection } from '../components/home/HeroSection';
import { ProcessSection } from '../components/home/ProcessSection';
import { ServicesSection } from '../components/home/ServicesSection';
import { TrustSection } from '../components/home/TrustSection';
import { WhyChooseUsSection } from '../components/home/WhyChooseUsSection';
import { SEOHead } from '../components/seo/SEOHead';
import { faqs } from '../data/faq';
import { routes } from '../data/routes';

export function HomePage() {
  return (
    <>
      <SEOHead route={routes.home} />
      <HeroSection />
      <TrustSection />
      <AboutSection />
      <ServicesSection />
      <WhyChooseUsSection />
      <ProcessSection />
      <CoverageSection />
      <FAQSection items={faqs} />
      <CTASection />
    </>
  );
}
