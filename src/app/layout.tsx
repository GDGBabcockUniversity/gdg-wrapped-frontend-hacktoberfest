import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GDSC WRAPPED",
  description: "GDSC WRAPPED",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <audio
          id="song"
          style={{ display: "none" }}
          controls
          src="/sound.mp3"
          loop
        />
      </body>
    </html>
  );
}
