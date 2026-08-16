import type { Metadata } from "next";
import "../../globals.css";
// import { RefetchServicesProvider } from "@/app/contexts/refetchServices";
import { Toaster } from 'sonner';

export const metadata: Metadata = {
  title: "Samskrithi | Backend Console",
  description: "Samskrithi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* <RefetchServicesProvider> */}
        <body className={`antialiased overflow-x-hidden overflow-y-hidden`}>{children}<Toaster /></body>
      {/* </RefetchServicesProvider> */}
    </html>
  );
}