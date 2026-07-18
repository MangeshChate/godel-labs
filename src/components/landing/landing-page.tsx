import BlogSection from "@/components/blog/blog-section";
import DataAuthoritySection from "@/components/landing/data-authority-section";
import DeploymentSection from "@/components/landing/deployment-section";
import FaqSection from "@/components/landing/faq-section";
import FinalCtaSection from "@/components/landing/final-cta-section";
import HeroSection from "@/components/landing/hero-section";
import ProductSection from "@/components/landing/product-section";
import RuntimeSecuritySection from "@/components/landing/runtime-security-section";
import SecurityGapSection from "@/components/landing/security-gap-section";
import UseCasesSection from "@/components/landing/use-cases-section";
import TestimonialsSection from "@/components/testimonials/testimonials-section";
import type { WordPressPost } from "@/lib/wordpress";

export default function LandingPage({ posts = [] }: { posts?: WordPressPost[] }) {
  return (
    <>
      <HeroSection />
      <RuntimeSecuritySection />
      <UseCasesSection />
      <ProductSection />
      <DataAuthoritySection />
      <SecurityGapSection />
      <DeploymentSection />
      <TestimonialsSection />
      <BlogSection posts={posts} />
      <FaqSection />
      <FinalCtaSection />
    </>
  );
}
