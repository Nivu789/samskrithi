import type { Metadata } from "next";
import "../../../app/globals.css";
import { RefetchServicesProvider } from "@/app/contexts/refetchServices";
import { Toaster } from 'sonner';

export const metadata: Metadata = {
  title: "Quad Dream | Backend Console",
  description: "Quad Dream",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <RefetchServicesProvider>
        <body className={`antialiased overflow-x-hidden overflow-y-hidden`}>{children}<Toaster /></body>
      </RefetchServicesProvider>
    </html>
  );
}