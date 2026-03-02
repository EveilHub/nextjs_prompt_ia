import type { Metadata } from "next";
import Menu from "./ui/menu";
import "./globals.css";

export const metadata: Metadata = {
  title: "IA Prompt",
  description: "IA Prompt with NextJs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Menu />
        {children}
      </body>
    </html>
  );
}
