import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// 🚨 ADD THIS LINE: Import Leaflet's CSS for map rendering
import 'leaflet/dist/leaflet.css'; 

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Amana Transportation - Live Tracker", // 💡 Updated title
  description: "Live bus tracking and schedule for Amana Transportation.", // 💡 Updated description
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // 💡 RESTORE THE HTML TAG
    <html lang="en">
      {/* 💡 ENSURE <body> IS THE IMMEDIATE CHILD TO AVOID WHITESPACE */}
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}