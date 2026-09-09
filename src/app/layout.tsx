import type { Metadata } from "next";
import { JetBrains_Mono, Prompt } from "next/font/google";
import "./globals.css";

const prompt = Prompt({
  subsets: ["latin", "thai"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-prompt",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Bangkok Smart Flood Risk Prediction & Monitoring",
  description:
    "Interactive prototype dashboard for Bangkok's 50 districts with a heuristic flood-risk engine, Leaflet heat map, and IoT operations story.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${prompt.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background font-sans text-foreground">
        {children}
      </body>
    </html>
  );
}
