
import { notFound } from "next/navigation";
import links from "@/data/links.json";
import RedirectLogic from "@/components/RedirectLogic";

type Props = {
  params: {
    id: string;
  };
};

// META DINAMIS (TANPA DESCRIPTION)
export async function generateMetadata({ params }: Props) {
  const data = (links as any)[params.id];

  if (!data) {
    return {
      title: "Not Found",
    };
  }

  return {
    title: data.title,
    icons: {
      icon: "/favicon.png",
    },
    openGraph: {
      title: data.title,
      images: [
        {
          url: data.image,
          width: 1200,
          height: 630,
        },
      ],
      type: "website",
    },
  };
}

// PAGE
export default function RedirectPage({ params }: Props) {
  const data = (links as any)[params.id];

  if (!data) {
    notFound();
  }

  return <RedirectLogic />;
}
