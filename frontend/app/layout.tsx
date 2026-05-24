import type { Metadata } from "next";
import Providers from "@/redux/provider";

export const metadata: Metadata = {
  title: "Product App",
  description: "Simple Next.js frontend with TypeScript",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "Arial, sans-serif", padding: "24px" }}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}