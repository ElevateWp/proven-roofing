import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { BLOG_POSTS, CLINIC_INFO, DENTISTS, SERVICES } from '@/lib/clinic-data';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import Button from '@/components/ui/Button';
import Accordion from '@/components/ui/Accordion';
import WordRevealH1 from '@/components/motion/WordRevealH1';
import AnimateOnScroll from '@/components/motion/AnimateOnScroll';
import PinnedHorizontalTrack, { HorizontalTrackItem } from '@/components/motion/PinnedHorizontalTrack';
import JsonLd from '@/components/ui/JsonLd';
import { createMetadata, generateFaqSchema } from '@/lib/seo';

interface BlogPostProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostProps): Promise<Metadata> {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);
  if (!post) return {};

  return createMetadata({
    title: `${post.title} | Roofing Advice`,
    description: post.excerpt,
    pathname: `/blog/${post.slug}/`,
    image: post.leadImage,
  });
}

export default function SingleBlogPage({ params }: BlogPostProps) {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);
  if (!post) notFound();

  const author = DENTISTS.find((d) => d.id === post.authorId) || DENTISTS[0];
  const relatedService = SERVICES.find((s) => s.slug === post.relatedServiceSlug);
  const otherPosts = BLOG_POSTS.filter((p) => p.slug !== post.slug);

  const relatedTrackItems: HorizontalTrackItem[] = otherPosts.map((p, idx) => ({
    id: p.slug,
    title: p.title,
    subtitle: `${p.category} • ${p.readTime}`,
    description: p.excerpt,
    href: `/blog/${p.slug}/`,
    theme: idx % 2 === 1 ? 'forest' : 'paper',
  }));

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: post.leadImage,
    datePublished: post.publishDate,
    dateModified: post.lastUpdated,
    author: {
      '@type': 'Person',
      name: author?.name || 'Equipe Proven Roofing',
    },
    publisher: {
      '@type': 'Organization',
      name: CLINIC_INFO.name,
    },
  };

  return (
    <div className="flex flex-col w-full bg-paper">
      <JsonLd data={articleSchema} />
      {post.content.faqs && <JsonLd data={generateFaqSchema(post.content.faqs)} />}

      {/* Top 2px Lime Reading Progress Bar */}
      <div
        className="fixed top-0 left-0 right-0 h-[2px] bg-lime z-50 pointer-events-none"
        aria-hidden="true"
      />

      {/* Article Header */}
      <article className="py-16 md:py-24 border-b border-mist">
        <div className="max-w-site mx-auto px-6 md:px-12">
          <Breadcrumbs
            items={[
              { name: 'Roofing Advice', path: '/blog/' },
              { name: post.category, path: '/blog/' },
              { name: post.title, path: `/blog/${post.slug}/` },
            ]}
          />

          <div className="max-w-3xl mt-8">
            <AnimateOnScroll animation="fade-right" duration={0.8}>
              <div className="flex items-center gap-3 font-body text-13 text-forest-ink/60 mb-3">
                <span className="text-forest font-medium">{post.category}</span>
                <span>•</span>
                <span className="tabular-nums">{post.readTime}</span>
                <span>•</span>
                <span>Published: {post.publishDate}</span>
                <span>•</span>
                <span>Updated: {post.lastUpdated}</span>
              </div>

              <WordRevealH1 text={post.title} className="mb-6" />

              <p className="font-body text-17 md:text-21 text-forest-ink/90 leading-relaxed italic mb-8">
                “{post.excerpt}”
              </p>

              {author && (
                <div className="flex items-center gap-4 p-4 border border-mist bg-paper/60 shadow-sm">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden bg-mist flex-shrink-0">
                    <Image
                      src={author.image}
                      alt={author.name}
                      fill
                      className="object-cover object-top"
                    />
                  </div>
                  <div>
                    <Link
                      href={`/our-team/${author.slug}/`}
                      className="font-display text-17 text-forest-ink hover:text-forest font-medium block"
                    >
                      {author.name}
                    </Link>
                    <span className="font-body text-13 text-forest-ink/60">
                      {author.title}
                    </span>
                  </div>
                </div>
              )}
            </AnimateOnScroll>
          </div>

          {/* Lead Image */}
          <AnimateOnScroll animation="zoom-in" duration={0.8}>
            <div className="relative w-full aspect-[21/9] max-h-[500px] bg-mist overflow-hidden border border-mist my-12 shadow-sm">
              <Image
                src={post.leadImage}
                alt={post.title}
                fill
                priority
                sizes="(max-width: 1200px) 100vw, 1200px"
                className="object-cover"
              />
            </div>
          </AnimateOnScroll>

          {/* Article content */}
          <div className="max-w-3xl space-y-12">
            <AnimateOnScroll animation="fade-up" duration={0.8}>
              <p className="font-body text-17 text-forest-ink/90 leading-relaxed">
                {post.content.intro}
              </p>
            </AnimateOnScroll>

            {post.content.sections.map((section, idx) => (
              <AnimateOnScroll key={idx} animation="fade-up" delay={idx * 0.1}>
                <section className="space-y-4">
                  <h2 className="font-display text-26 md:text-33 text-forest-ink">
                    {section.heading}
                  </h2>
                  <p className="font-body text-17 text-forest-ink/85 leading-relaxed">
                    {section.body}
                  </p>
                </section>
              </AnimateOnScroll>
            ))}

            {/* Related Service Bridge */}
            {relatedService && (
              <AnimateOnScroll animation="fade-up" duration={0.8}>
                <div className="p-8 bg-mist/40 border border-mist my-8 shadow-sm">
                  <span className="font-body text-13 text-forest block mb-1 font-medium uppercase tracking-wider">
                    Related Roofing Service
                  </span>
                  <h3 className="font-display text-21 text-forest-ink mb-2">
                    {relatedService.name}
                  </h3>
                  <p className="font-body text-15 text-forest-ink/80 mb-4">
                    {relatedService.shortDescription}
                  </p>
                  <Link
                    href={`/${relatedService.slug}/`}
                    className="font-body text-15 text-forest font-medium underline underline-offset-4"
                  >
                    Explore {relatedService.navLabel} →
                  </Link>
                </div>
              </AnimateOnScroll>
            )}

            {/* Article Frequently Asked Questions */}
            {post.content.faqs && post.content.faqs.length > 0 && (
              <AnimateOnScroll animation="fade-up" duration={0.8}>
                <div className="pt-8 border-t border-mist">
                  <h3 className="font-display text-26 text-forest-ink mb-6">
                    Questions on This Topic
                  </h3>
                  <Accordion items={post.content.faqs} />
                </div>
              </AnimateOnScroll>
            )}
          </div>
        </div>
      </article>

      {/* SECTION: Related Articles (Second Permitted Pinned Horizontal Track) */}
      {relatedTrackItems.length > 0 && (
        <PinnedHorizontalTrack
          items={relatedTrackItems}
          title="Related Roofing Advice"
        />
      )}

      {/* Appointment CTA */}
      <section className="py-20 md:py-28 bg-forest text-paper">
        <div className="max-w-site mx-auto px-6 md:px-12 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <AnimateOnScroll animation="fade-right" duration={0.8}>
            <div>
              <span className="font-body text-13 text-lime uppercase tracking-wider block mb-2 font-medium">
                Roofing Advice
              </span>
              <h2 className="font-display text-33 md:text-41 text-paper">
                Discuss Your Roofing Plans with Our Team
              </h2>
            </div>
          </AnimateOnScroll>
          <AnimateOnScroll animation="fade-left" duration={0.8} delay={0.2}>
            <Button href="/request-a-quote/" variant="lime" size="lg">
              Request a Quote
            </Button>
          </AnimateOnScroll>
        </div>
      </section>
    </div>
  );
}
