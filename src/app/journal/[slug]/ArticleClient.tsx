"use client";

import Image from "next/image";
import Link from "next/link";
import { Clock, ArrowLeft } from "lucide-react";
import { getArticleBySlug, articles } from "@/lib/articles";
import Breadcrumb from "@/components/ui/Breadcrumb";
import type { Article } from "@/lib/types";

// Render markdown-like body with basic formatting
function renderBody(body: string) {
  return body.split("\n\n").map((para, i) => {
    if (para.startsWith("**") && para.endsWith("**")) {
      return (
        <h3 key={i} className="font-serif text-2xl text-text-title tracking-[-0.02em] mt-8 mb-4">
          {para.replace(/\*\*/g, "")}
        </h3>
      );
    }
    const parts = para.split(/(\*\*[^*]+\*\*)/g);
    return (
      <p key={i} className="text-base text-text-body font-light leading-relaxed mb-4">
        {parts.map((part, j) =>
          part.startsWith("**") ? (
            <strong key={j} className="font-semibold text-text-title">{part.replace(/\*\*/g, "")}</strong>
          ) : (
            <span key={j}>{part}</span>
          )
        )}
      </p>
    );
  });
}

export default function ArticleClient({ article }: { article: Article }) {
  const related = articles.filter((a) => a.slug !== article.slug && a.category === article.category).slice(0, 2);

  return (
    <main className="min-h-screen bg-warm-white pt-28 pb-20">
      <div className="max-w-[900px] mx-auto px-6 md:px-12">
        <Breadcrumb crumbs={[
          { label: "Home", href: "/" },
          { label: "Journal", href: "/journal" },
          { label: article.category, href: "/journal" },
          { label: article.title.slice(0, 30) + "…" },
        ]} />

        <header className="mt-8 mb-10">
          <div className="flex items-center gap-3 mb-5">
            <span className="px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-[0.25em] bg-sage/10 text-sage border border-sage/20">{article.category}</span>
            <span className="flex items-center gap-1 text-[10px] text-text-meta font-light"><Clock className="w-3 h-3" /> {article.readingTime} min read</span>
            <span className="text-[10px] text-text-meta font-light">{article.date}</span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-text-title leading-[1.0] tracking-[-0.03em] mb-6">{article.title}</h1>
          <p className="text-lg text-text-body font-light leading-relaxed mb-8 text-text-meta italic">{article.excerpt}</p>
          <div className="flex items-center gap-4 pb-8 border-b border-black/8">
            <div className="w-10 h-10 rounded-full bg-sage/15 flex items-center justify-center text-sage font-serif text-lg font-medium">
              {article.author.name.charAt(0)}
            </div>
            <div>
              <p className="text-sm font-semibold text-text-title">{article.author.name}</p>
              <p className="text-[10px] text-text-meta font-light">{article.author.role}</p>
            </div>
          </div>
        </header>

        <div className="relative aspect-[16/7] rounded-[28px] overflow-hidden bg-cream/60 border border-black/5 mb-12">
          <Image
            src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}${article.image}`}
            alt={article.title}
            fill
            className="object-contain p-12 drop-shadow-xl"
            priority
          />
        </div>

        <article className="prose-aurelia max-w-none">
          {renderBody(article.body)}
        </article>

        <div className="mt-16 pt-10 border-t border-black/8">
          <Link href="/journal" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-text-meta hover:text-sage transition-colors mb-10">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Journal
          </Link>

          {related.length > 0 && (
            <div>
              <h2 className="font-serif text-3xl text-text-title mb-6">More from <span className="italic text-sage">{article.category}</span></h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {related.map((rel) => (
                  <Link key={rel.slug} href={`/journal/${rel.slug}`} className="group flex gap-4 p-5 rounded-2xl bg-white border border-black/5 hover:shadow-md transition-shadow">
                    <div className="relative w-16 h-16 shrink-0 rounded-xl bg-cream/60">
                      <Image src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}${rel.image}`} alt={rel.title} fill className="object-contain p-2" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-text-meta mb-1">{rel.category}</p>
                      <h3 className="font-serif text-sm text-text-title group-hover:text-sage transition-colors leading-tight line-clamp-2">{rel.title}</h3>
                      <span className="flex items-center gap-1 text-[9px] text-text-meta mt-1 font-light"><Clock className="w-2.5 h-2.5" /> {rel.readingTime} min</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
