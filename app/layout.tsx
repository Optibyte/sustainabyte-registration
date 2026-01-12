import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  metadataBase: new URL("https://sustainabyte.com"),
  title: {
    default: "Sustainabyte - Smart Savings for a Sustainable Future",
    template: "%s | Sustainabyte",
  },
  description:
    "Your facility deserves to be EPIC. Achieve 7-30% energy savings through efficient, predictive, intelligent, and controlled optimization. Book your consultation today.",
  keywords: [
    "energy savings",
    "facility optimization",
    "sustainability",
    "HVAC optimization",
    "energy management",
    "carbon neutrality",
    "operational efficiency",
    "predictive controls",
    "intelligent systems",
  ],
  authors: [{ name: "Sustainabyte" }],
  creator: "Sustainabyte",
  publisher: "Sustainabyte",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://sustainabyte.com",
    siteName: "Sustainabyte",
    title: "Sustainabyte - Smart Savings for a Sustainable Future",
    description:
      "Your facility deserves to be EPIC. Achieve 7-30% energy savings through efficient, predictive, intelligent, and controlled optimization.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Sustainabyte - Smart Savings for a Sustainable Future",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sustainabyte - Smart Savings for a Sustainable Future",
    description:
      "Your facility deserves to be EPIC. Achieve 7-30% energy savings through efficient, predictive, intelligent, and controlled optimization.",
    images: ["/og-image.jpg"],
    creator: "@sustainabyte",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="font-sans antialiased"
        style={{
          fontFamily:
            '"Segoe UI", -apple-system, BlinkMacSystemFont, "Roboto", "Oxygen", "Ubuntu", "Cantarell", sans-serif',
        }}
      >
        {children}
        <Toaster position="top-right" richColors closeButton />
      </body>
    </html>
  );
}
