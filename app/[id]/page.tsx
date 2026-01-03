
import links from "@/data/links.json";
import { notFound } from "next/navigation";
import RedirectLogic from "@/components/RedirectLogic";

export async function generateMetadata({ params }: any) {
  const data = (links as any)[params.id];
  if (!data) return {};

  return {
    title: data.title,
    openGraph: {
      images: [data.image],
    },
  };
}

export default function RedirectPage({ params }: any) {
  const data = (links as any)[params.id];
  if (!data) notFound();

  return <RedirectLogic />;
}
