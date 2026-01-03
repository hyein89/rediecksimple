import { notFound } from "next/navigation";
import links from "@/data/links.json";
import RedirectLogic from "@/components/RedirectLogic";

type Props = {
  params: {
    id: string;
  };
};

// META DINAMIS + ROBOTS LENGKAP
export async function generateMetadata({ params }: Props) {
  const data = (links as any)[params.id];

  if (!data) {
    return {
      title: "Not Found",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return {
    title: data.title,
    icons: {
      icon: "/favicon.png",
    },

    // 🔥 ROBOTS RULES
    robots: {
      index: false,
      follow: false,
      nocache: true,
      noimageindex: true,
      googleBot: {
        index: false,
        follow: false,
        noarchive: true,
        nosnippet: true,
      },
    },

    // OPEN GRAPH (ambil dari JSON)
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
