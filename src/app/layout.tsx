import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GDG WRAPPED",
  description: "GDG WRAPPED",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
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
