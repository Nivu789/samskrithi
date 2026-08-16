export const metadata = {
  title: "Samskrithi | Backend Console",
  description: "Samskrithi",
};

// import "../../../globals.css";
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}