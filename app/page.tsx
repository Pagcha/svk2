import { SiteHeader } from "@/components/site-header"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { CompetenciesSection } from "@/components/competencies-section"
import ProductsSection from "@/components/product-section"
import { PartnersSection } from "@/components/partners-section"
import { WhyUsSection } from "@/components/why-us-section"
import { ContactSection } from "@/components/contact-section"

export default function Page() {
  return (
    <div className="min-h-screen bg-white">
      <SiteHeader />
      <main>
        <HeroSection />
        <ProductsSection />
        <AboutSection />
        <CompetenciesSection />
        <PartnersSection />
        <WhyUsSection />
        <ContactSection />
      </main>
    </div>
  )
}
