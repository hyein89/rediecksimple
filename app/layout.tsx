import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Redirect URL",
  description: "Create safe redirect URLs with tracking and fallback system",
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "Create Redirect URL",
    description: "Create safe redirect URLs with tracking and fallback system",
    images: [
      {
        url: "/og-default.jpg",
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

