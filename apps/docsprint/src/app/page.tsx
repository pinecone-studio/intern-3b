import DashboardLayout from '../components/DashboardLayout';
import { Hero } from '../components/landing/Hero';
import { Navbar } from '../components/landing/Navbar';
import { Pricing } from '../components/landing/Pricing';

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Pricing />
    </div>
  );
}
