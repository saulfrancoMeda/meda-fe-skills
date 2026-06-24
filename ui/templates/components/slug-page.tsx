import { notFound } from "next/navigation";
import { COMPONENT_META } from "../_meta";
import { ComponentDetail } from "../_detail";

// Pre-render one static page per component at build time.
export function generateStaticParams() {
  return COMPONENT_META.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const meta = COMPONENT_META.find((c) => c.slug === slug);
  return { title: meta ? `${meta.name} — MEDA UI` : "MEDA UI" };
}

export default async function ComponentDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!COMPONENT_META.some((c) => c.slug === slug)) notFound();
  return <ComponentDetail slug={slug} />;
}
