// app/[locale]/layout.tsx
import "@/app/globals.css"; // Make sure path is correct if globals.css is in app/
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/navbar";

const inter = Inter({ subsets: ["latin"] });

// You can make metadata dynamic based on locale here if needed
// export async function generateMetadata({ params: { locale } }: { params: { locale: string }}) { ... }
export const metadata: Metadata = {
  title: "Free Alexey Malyarevsky - Political Prisoner",
  description: "Campaign to free Alexey Malyarevsky, sentenced to 7 years for peaceful political activism in Russia",
};

export default function LocaleLayout({ // Renamed for clarity, but default export is what matters
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  console.log("Locale in app/[locale]/layout.tsx:", locale); // Add this log
  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={inter.className}>
        {/* ThemeProvider could also be here if it was in the root and doesn't re-wrap */}
        <Navbar locale={locale} />
        {children}
      </body>
    </html>
  );
}