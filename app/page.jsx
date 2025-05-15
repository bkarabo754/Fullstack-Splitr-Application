import CallToAction from '@/components/shared/CallToAction';
import FeaturesSection from '@/components/shared/FeaturesSection';
import Footer from '@/components/shared/Footer';
import HeroSection from '@/components/shared/HeroSection';
import HowItWorksSection from '@/components/shared/HowItWorksSection';
import Testimonials from '@/components/shared/Testimonials';
import { Separator } from '@/components/ui/separator';

export default function Home() {
  return (
    <div className="flex flex-col pt-16 dark:bg-zin-950 dark:text-white">
      <HeroSection />
      <Separator />
      <FeaturesSection />
      <Separator />
      <HowItWorksSection />
      <Separator />
      <Testimonials />
      <Separator />
      <CallToAction />
      <Footer />
    </div>
  );
}
