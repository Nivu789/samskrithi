export const metadata = {
  title: "Quad Dream | Backend Console",
  description: "Quad Dream",
};

import "../../../globals.css";
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}