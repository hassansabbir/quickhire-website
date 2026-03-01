import type { Metadata } from "next";
import { Epilogue } from "next/font/google";
import localFont from "next/font/local";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const epilogue = Epilogue({
  variable: "--font-epilogue",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const clashDisplay = localFont({
  src: [
    {
      path: "../assets/fonts/ClashDisplay-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/ClashDisplay-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../assets/fonts/ClashDisplay-Semibold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../assets/fonts/ClashDisplay-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-clash-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "QuickHire - Discover More Than 5000+ Jobs",
  description:
    "Great platform for the job seeker that searching for new career heights and passionate about startups.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${epilogue.variable} ${clashDisplay.variable} font-sans antialiased min-h-screen flex flex-col`}
        suppressHydrationWarning
      >
        <Toaster position="top-right" />
        {children}
      </body>
    </html>
  );
}
