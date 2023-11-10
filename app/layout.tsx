import RootProviders from "@/providers/rootProviders";
import { Analytics } from "@vercel/analytics/react";
import { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../components/Header";
import "../styles/globals.css";

let title = "Daphunt";
let description = "Find the next money making dapp to invest your cryptos";
let url = "https://daphunt.com";
let ogimage = "https://daphunt.com/og-image.png";
let sitename = "daphunt";

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title,
  description,

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
          <Toaster position="top-right" />
          <Analytics />
        </RootProviders>
      </body>
    </html>
  );
}
