import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/footer/footer";
import Reveal from "@/components/landing/reveal";
import SectionLabel from "@/components/landing/section-label";
import { useCasesData } from "@/data/use-cases";
import { ArrowRight, Download } from "lucide-react";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(useCasesData).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const useCase = useCasesData[slug];
  if (!useCase) return {};

  return {
    title: `${useCase.title} | Gödel Security Gate`,
    description: useCase.description,
  };
}

export default async function UseCaseDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const useCase = useCasesData[slug];

  if (!useCase) {
    notFound();
  }

  // Other use cases to navigate to
  const otherUseCases = Object.values(useCasesData).filter(
    (item) => item.slug !== slug
  );

  return (
    <main className="min-h-screen bg-[#f7f5ff] text-[#111322]">
      <Navbar />

      {/* Header / Title Section */}
      <section className="relative overflow-hidden px-4 pb-12 pt-28 sm:px-6 sm:pb-14 sm:pt-36">
        <div className="hero-grid absolute inset-0 opacity-45" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[480px] bg-[linear-gradient(to_bottom,rgba(109,73,253,.08),transparent_80%)]" />

        <div className="relative mx-auto max-w-[1020px]">
          <Reveal>
            <h1 className="max-w-[880px] text-3xl font-semibold leading-[1.08] tracking-[-0.035em] text-[#111322] sm:text-5xl lg:text-6xl">
              {useCase.title}
            </h1>
            <p className="mt-5 max-w-[760px] text-base leading-7 text-[#5d576a] sm:text-lg sm:leading-8">
              {useCase.description}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="https://godels-gate.godel-labs.ai/docs/desktop/installation"
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 rounded-full bg-[#6d49fd] px-6 py-3 text-sm font-semibold text-white shadow-md transition duration-150 hover:bg-[#5e32ff] active:scale-[0.97]"
              >
                <span>Install Gödel Security Gate</span>
                <Download className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
              </Link>
              <Link
                href="/demo"
                className="inline-flex items-center gap-2 rounded-full border border-[#d6ceed] bg-white px-6 py-3 text-sm font-semibold text-[#221d2d] transition duration-150 hover:border-[#6d49fd]/40 hover:bg-[#f6f3fe] active:scale-[0.97]"
              >
                <span>Book Demo</span>
                <ArrowRight className="h-4 w-4 text-[#6d49fd]" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Video Demonstration Section */}
      <section className="border-t border-[#e5dff0] bg-white px-4 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-[1020px]">
          <Reveal className="max-w-[760px]">
            <SectionLabel>Walkthrough Demonstration</SectionLabel>
            <h2 className="mt-3 text-2xl font-semibold leading-tight tracking-tight text-[#111322] sm:text-3xl">
              See {useCase.shortTitle} in action
            </h2>
            <p className="mt-2 text-sm leading-6 text-[#625d6e] sm:text-base">
              {useCase.videoCaption}
            </p>
          </Reveal>

          {/* Video Player Frame */}
          <Reveal className="mt-8 overflow-hidden rounded-[24px] border border-[#ded5f0] bg-[#110e1c] p-2 shadow-[0_20px_50px_rgba(24,14,50,.15)] sm:p-3">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[18px] bg-black">
              <video
                src={useCase.videoSrc}
                controls
                autoPlay
                loop
                muted
                playsInline
                className="h-full w-full object-cover"
              >
                Your browser does not support HTML5 video playback.
              </video>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Information Paragraphs Below Video */}
      <section className="border-t border-[#e5dff0] bg-[#f7f5ff] px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-[920px]">
          <Reveal>
            <SectionLabel>Overview & Architecture</SectionLabel>
            <h2 className="mt-3 text-2xl font-semibold leading-tight tracking-tight text-[#111322] sm:text-4xl">
              How Gödel secures {useCase.shortTitle.toLowerCase()}
            </h2>

            <div className="mt-8 flex flex-col gap-6 text-base leading-8 text-[#484254] sm:text-[17px] sm:leading-8">
              {useCase.detailedParagraphs.map((paragraph, index) => (
                <p key={index} className="rounded-2xl border border-[#e4dced] bg-white p-6 sm:p-7 shadow-sm">
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Explore Other Use Cases Section */}
      <section className="border-t border-[#e5dff0] bg-white px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-[1020px]">
          <Reveal className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <SectionLabel>Ecosystem Navigation</SectionLabel>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[#111322] sm:text-4xl">
                Explore Other Use Cases
              </h2>
            </div>
            <Link
              href="/use-cases"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6d49fd] hover:underline"
            >
              <span>View All 6 Use Cases</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </Reveal>

          {/* Grid of Other Use Cases */}
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {otherUseCases.map((item, idx) => (
              <Reveal key={item.slug} delay={idx * 0.06}>
                <Link
                  href={`/use-cases/${item.slug}`}
                  className="group flex h-full flex-col justify-between rounded-2xl border border-[#e5dfef] bg-[#fbfaff] p-5 transition-all duration-200 hover:border-[#6d49fd] hover:bg-[#f6f2fd] hover:shadow-md"
                >
                  <div>
                    <h3 className="text-base font-semibold text-[#1c1825] transition group-hover:text-[#6d49fd]">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-xs leading-5 text-[#6e6878]">
                      {item.shortDescription}
                    </p>
                  </div>

                  <div className="mt-5 flex items-center gap-1 text-xs font-semibold text-[#6d49fd]">
                    <span>Learn more</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
