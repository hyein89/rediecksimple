import "./globals.css";
import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Create Redirect URL",
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "Create Redirect URL",
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
      <head>
        {/* HISTATS GLOBAL */}
        <Script
          id="histats"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              var _Hasync = _Hasync || [];
              _Hasync.push(['Histats.start', '1,4828760,4,0,0,0,00010000']);
              _Hasync.push(['Histats.fasi', '1']);
              _Hasync.push(['Histats.track_hits', '']);
              (function() {
                var hs = document.createElement('script');
                hs.type = 'text/javascript';
                hs.async = true;
                hs.src = '//s10.histats.com/js15_as.js';
                (document.head || document.body).appendChild(hs);
              })();
            `,
          }}
        />
      </head>

      <body>
        {children}

        {/* HISTATS NOSCRIPT */}
        <noscript>
          <a href="/" target="_blank" rel="noreferrer">
            <img src="//sstatic1.histats.com/0.gif?4828760&101" alt="" />
          </a>
        </noscript>
      </body>
    </html>
  );
}

