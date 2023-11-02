import RootProviders from "@/providers/rootProviders";
import { Analytics } from "@vercel/analytics/react";
import { Metadata } from "next";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../components/Header";
import "../styles/globals.css";

let title = "AI Angel Investors";
let description = "Find your next AI angel";
let url = "https://www.aiangels.fund";
let ogimage = "https://www.aiangels.fund/og-image.png";
let sitename = "aiangels.fund";

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title,
  description,
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    images: [ogimage],
    title,
    description,
    url: url,
    siteName: sitename,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [ogimage],
    title,
    description,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light">
      <body>
        <RootProviders>
          <ToastContainer />
          <div className="min-h-screen px-6 lg:px-8">
            <div className="mx-auto max-w-6xl pt-4">
              <Header />
              {children}
            </div>
          </div>
          <Analytics />
        </RootProviders>
      </body>
    </html>
  );
}
