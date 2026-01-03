import "./globals.css";


export const metadata = {
  title: "Watch Video - 060",
  description:
    "Just Pron Tv - Watch free full videos on traxxxcr07",
  icons: {
    icon: "https://i.ibb.co.com/Y7q3Bv3K/5988576.png",
    apple: "https://i.ibb.co.com/Y7q3Bv3K/5988576.png"
  },
  openGraph: {
    images: [
      "https://i.ibb.co.com/TxpdHXJC/12604576-12604576-880x660.jpg"
    ]
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
