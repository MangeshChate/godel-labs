import BlogSection from "@/components/blog/blog-section";
import DataAuthoritySection from "@/components/landing/data-authority-section";
import FaqSection from "@/components/landing/faq-section";
import FinalCtaSection from "@/components/landing/final-cta-section";
import HeroSection from "@/components/landing/hero-section";
import ProductSection from "@/components/landing/product-section";
import SecurityGapSection from "@/components/landing/security-gap-section";
import UseCasesSection from "@/components/landing/use-cases-section";
import TestimonialsSection from "@/components/testimonials/testimonials-section";
import type { WordPressPost } from "@/lib/wordpress";

export default function LandingPage({ posts = [] }: { posts?: WordPressPost[] }) {
  return (
    <>
      <HeroSection />
      <UseCasesSection />
      <ProductSection />
      <DataAuthoritySection />
      <SecurityGapSection />
      <TestimonialsSection />
      <BlogSection posts={posts} />
      <FaqSection />
      <FinalCtaSection />
    </>
  );
}
