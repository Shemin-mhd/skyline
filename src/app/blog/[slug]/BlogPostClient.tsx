"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Clock,
  Calendar,
  Share2,
  Check,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Phone,
  ChevronRight,
  CheckCircle2
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuoteModal from "@/components/QuoteModal";
import WhatsAppChatIcon from "@/components/WhatsAppChatIcon";
import { BlogPost } from "@/lib/blog-store";
import { useWhatsAppNumber } from "@/lib/use-whatsapp-number";

interface BlogPostClientProps {
  post: BlogPost;
  relatedPosts: BlogPost[];
}

export default function BlogPostClient({ post, relatedPosts }: BlogPostClientProps) {
  const { getWhatsAppUrl } = useWhatsAppNumber();
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const currentUrl = typeof window !== "undefined" ? window.location.href : "";
  const encodedTitle = encodeURIComponent(post.title);
  const encodedUrl = encodeURIComponent(currentUrl);

  return (
    <div className="min-h-screen bg-white text-[#111] font-sans selection:bg-black selection:text-white">
      {/* Global Fixed Header */}
      <Header onOpenQuoteModal={() => setIsQuoteModalOpen(true)} />

      <main>
        {/* Editorial Top Bar / Breadcrumb Header */}
        <section className="w-full bg-[#FAF9F6] border-b border-gray-200/80 py-8 sm:py-10">
          <div className="w-full max-w-[1400px] mx-auto px-5 sm:px-8 md:px-12">
            {/* Breadcrumb */}
            <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-gray-400 mb-4">
              <Link href="/" className="hover:text-black transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3 h-3 text-gray-300" />
              <Link href="/blog" className="hover:text-black transition-colors">
                Blog
              </Link>
              <ChevronRight className="w-3 h-3 text-gray-300" />
              <span className="text-black font-bold">{post.category}</span>
            </div>

            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gray-600 hover:text-black transition-colors mb-4 group"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
              <span>Back to All Guides</span>
            </Link>

            {/* Article Heading */}
            <div className="max-w-4xl space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black text-white text-[11px] font-bold uppercase tracking-wider">
                <span>{post.category}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#111] leading-[1.12] tracking-tight uppercase">
                {post.title}
              </h1>

              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                {post.excerpt}
              </p>

              {/* Author & Share Bar */}
              <div className="pt-5 border-t border-gray-200 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-11 h-11 rounded-full object-cover border border-gray-300 shadow-xs"
                  />
                  <div>
                    <div className="font-bold text-sm text-[#111]">
                      {post.author.name}
                    </div>
                    <div className="text-xs text-gray-500 font-medium">
                      {post.author.role} • Skylink Acoustics
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-gray-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-gray-400" />
                    {new Date(post.publishedAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-gray-400" />
                    {post.readTime}
                  </span>
                  <span>•</span>
                  {/* Share buttons */}
                  <div className="flex items-center gap-2">
                    <a
                      href={`https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#128C7E] transition-colors"
                      title="Share on WhatsApp"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                    </a>
                    <button
                      onClick={handleCopyLink}
                      className="px-3 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-semibold transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      {copiedLink ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-green-600" />
                          <span className="text-green-700">Copied</span>
                        </>
                      ) : (
                        <span>Copy Link</span>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Cover Image */}
        <section className="w-full max-w-[1400px] mx-auto px-5 sm:px-8 md:px-12 my-8">
          <div className="relative rounded-3xl overflow-hidden border border-gray-200 shadow-md h-[320px] sm:h-[460px] bg-gray-100">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        </section>

        {/* Article Body & Sidebar */}
        <section className="w-full max-w-[1400px] mx-auto px-5 sm:px-8 md:px-12 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Main Content Column */}
            <div className="lg:col-span-8">
              <div className="space-y-6 text-gray-700 leading-relaxed text-base sm:text-lg">
                {post.content.map((block, idx) => {
                  if (block.type === "paragraph") {
                    return (
                      <p key={idx} className="text-gray-700 font-sans leading-relaxed">
                        {block.text}
                      </p>
                    );
                  }

                  if (block.type === "heading2") {
                    return (
                      <h2
                        key={idx}
                        className="text-2xl sm:text-3xl font-bold text-[#111] tracking-tight pt-8 pb-3 border-b border-gray-200 uppercase"
                      >
                        {block.text}
                      </h2>
                    );
                  }

                  if (block.type === "heading3") {
                    return (
                      <h3
                        key={idx}
                        className="text-xl sm:text-2xl font-bold text-[#111] tracking-tight pt-4 uppercase"
                      >
                        {block.text}
                      </h3>
                    );
                  }

                  if (block.type === "callout") {
                    return (
                      <div
                        key={idx}
                        className="my-8 rounded-2xl bg-[#FAF9F6] border-l-4 border-black border-y border-r border-gray-200 p-6 sm:p-8 relative shadow-xs"
                      >
                        <div className="flex items-start gap-4">
                          <div className="p-2.5 rounded-xl bg-black text-white shrink-0 mt-0.5">
                            <ShieldCheck className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="text-base sm:text-lg font-bold text-[#111] mb-2 uppercase">
                              {block.title}
                            </h4>
                            <p className="text-gray-600 text-sm sm:text-base leading-relaxed m-0">
                              {block.text}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  }

                  if (block.type === "list") {
                    return (
                      <ul key={idx} className="space-y-4 my-6 pl-0 list-none">
                        {block.items.map((item, itemIdx) => {
                          const [boldPart, ...rest] = item.split(":");
                          return (
                            <li key={itemIdx} className="flex items-start gap-3">
                              <CheckCircle2 className="w-5 h-5 text-black shrink-0 mt-1" />
                              <span className="text-sm sm:text-base text-gray-700 leading-relaxed">
                                {rest.length > 0 ? (
                                  <>
                                    <strong className="text-[#111] font-bold">
                                      {boldPart}:
                                    </strong>
                                    {rest.join(":")}
                                  </>
                                ) : (
                                  item
                                )}
                              </span>
                            </li>
                          );
                        })}
                      </ul>
                    );
                  }

                  if (block.type === "quote") {
                    return (
                      <blockquote
                        key={idx}
                        className="my-8 pl-6 border-l-4 border-black italic text-lg sm:text-xl text-gray-900 bg-[#FAF9F6] p-6 rounded-r-2xl"
                      >
                        &ldquo;{block.quote}&rdquo;
                        {block.author && (
                          <span className="block not-italic text-sm text-gray-500 font-semibold mt-2">
                            — {block.author}
                          </span>
                        )}
                      </blockquote>
                    );
                  }

                  return null;
                })}
              </div>

              {/* Tags Section */}
              <div className="mt-12 pt-6 border-t border-gray-200 flex flex-wrap items-center gap-2">
                <span className="text-xs uppercase font-bold tracking-wider text-gray-400 mr-2">
                  Keywords:
                </span>
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3.5 py-1 rounded-full bg-gray-100 border border-gray-200 text-xs font-medium text-gray-700"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Author Bio Card */}
              <div className="mt-10 rounded-3xl bg-[#FAF9F6] border border-gray-200 p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-gray-300 shrink-0"
                />
                <div className="space-y-2 text-center sm:text-left">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                    <h4 className="text-lg font-bold text-[#111] uppercase">
                      {post.author.name}
                    </h4>
                    <span className="px-2.5 py-0.5 rounded-full bg-black text-white text-[10px] uppercase font-bold tracking-wider">
                      Skylink Specialist
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 font-medium">
                    {post.author.role}
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed pt-1">
                    Lead acoustic consultant for high-profile residential developments, commercial high-rises, and private cinema acoustic architecture across Bahrain and the Gulf region.
                  </p>
                </div>
              </div>

              {/* In-Article Consultation CTA Banner */}
              <div className="mt-12 rounded-3xl bg-[#111315] text-white p-8 sm:p-12 relative overflow-hidden shadow-2xl">
                <div className="max-w-xl relative z-10 space-y-3">
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 block">
                    Engineering Consultation
                  </span>
                  <h3 className="text-xl sm:text-3xl font-bold text-white uppercase leading-tight">
                    Planning an Acoustic or Soundproofing Project in Bahrain?
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed">
                    Let our certified acoustics team calculate partition STC ratings, conduct spatial decibel tests, or design your turnkey home cinema.
                  </p>
                  <div className="flex flex-wrap items-center gap-4 pt-4">
                    <button
                      onClick={() => setIsQuoteModalOpen(true)}
                      className="px-7 py-3 rounded-full bg-white text-black font-bold text-xs uppercase tracking-wider hover:bg-gray-200 transition-all cursor-pointer shadow-md"
                    >
                      Request Acoustic Quote
                    </button>
                    <a
                      href={getWhatsAppUrl(`Hello Skylink, I read your article "${post.title}" and would like an acoustic consultation.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-7 py-3 rounded-full bg-[#00A859] hover:bg-[#009650] text-white font-semibold text-xs uppercase tracking-wider transition-all flex items-center gap-2"
                    >
                      <WhatsAppChatIcon className="w-4 h-4 fill-white shrink-0" />
                      <span>WhatsApp Consultation</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Sticky Sidebar */}
            <div className="lg:col-span-4">
              <div className="sticky top-28 space-y-8">
                {/* Fast Action Consultation Box */}
                <div className="rounded-3xl bg-[#FAF9F6] border border-gray-200/90 p-7 shadow-sm">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-black mb-3">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Single-Point Turnkey</span>
                  </div>
                  <h4 className="text-lg font-bold text-[#111] uppercase leading-snug mb-2">
                    Certified Acoustic Engineering
                  </h4>
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-6">
                    We manage your project from acoustic simulation through custom fabrication and decibel verification.
                  </p>
                  <button
                    onClick={() => setIsQuoteModalOpen(true)}
                    className="w-full py-3 rounded-full bg-black text-white text-xs font-bold uppercase tracking-wider hover:bg-gray-800 transition-colors cursor-pointer mb-3 shadow-sm"
                  >
                    Get a Free Quote
                  </button>
                  <a
                    href="tel:+97333048555"
                    className="w-full py-2.5 rounded-full bg-white hover:bg-gray-100 border border-gray-300 text-[#111] text-xs font-semibold tracking-wider flex items-center justify-center gap-2 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-gray-500" />
                    <span>Call +973 33048555</span>
                  </a>
                </div>

                {/* Related Articles Card */}
                {relatedPosts.length > 0 && (
                  <div className="rounded-3xl bg-white border border-gray-200/90 p-7 shadow-sm">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-5 pb-3 border-b border-gray-200">
                      Related Publications
                    </h4>
                    <div className="space-y-5">
                      {relatedPosts.map((rel) => (
                        <Link
                          key={rel.id}
                          href={`/blog/${rel.slug}`}
                          className="group block"
                        >
                          <div className="flex gap-3.5">
                            <img
                              src={rel.coverImage}
                              alt={rel.title}
                              className="w-18 h-18 rounded-xl object-cover border border-gray-200 shrink-0 group-hover:scale-104 transition-transform bg-gray-100"
                            />
                            <div>
                              <span className="text-[10px] font-bold text-black uppercase tracking-wider block mb-1">
                                {rel.category}
                              </span>
                              <h5 className="text-xs font-bold text-[#111] group-hover:text-gray-600 transition-colors line-clamp-2 leading-snug uppercase">
                                {rel.title}
                              </h5>
                              <span className="text-[10px] text-gray-400 font-medium block mt-1">
                                {rel.readTime}
                              </span>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <QuoteModal isOpen={isQuoteModalOpen} onClose={() => setIsQuoteModalOpen(false)} />
    </div>
  );
}
