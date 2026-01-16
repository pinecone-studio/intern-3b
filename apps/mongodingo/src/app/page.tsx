import { HomepageHeader } from '@/components/homepage-header';
import { HomepageHero } from '@/components/homepage-hero';
import { HomepageProblem } from '@/components/homepage-problem';
import { HomepageSolution } from '@/components/homepage-solution';
import { HomepageFeatures } from '@/components/homepage-features';
import { HomepageHowItWorks } from '@/components/homepage-how-it-works';
import { HomepageDemo } from '@/components/homepage-demo';
import { HomepageTestimonials } from '@/components/homepage-testimonials';
import { HomepageCTA } from '@/components/homepage-cta';
import { HomepageFooter } from '@/components/homepage-footer';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HomepageHeader />
      <HomepageHero />
      <HomepageProblem />
      <HomepageSolution />
      <HomepageFeatures />
      <HomepageHowItWorks />
      <HomepageDemo />
      <HomepageTestimonials />
      <HomepageCTA />
      <HomepageFooter />
    </div>
  );
}
