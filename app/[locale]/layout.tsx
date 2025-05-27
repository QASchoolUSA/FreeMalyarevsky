// app/[locale]/layout.tsx
import "@/app/globals.css"; // Make sure path is correct if globals.css is in app/
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/navbar";
import enTranslations from '../../public/locales/en/common.json';
import ruTranslations from '../../public/locales/ru/common.json';

const inter = Inter({ subsets: ["latin"] });

const baseUrl = 'https://freemalyarevsky.com';

export async function generateMetadata({ 
  params 
}: { 
  params: { locale: string } 
}): Promise<Metadata> {
  // Get translations based on the locale
  const t = params.locale === 'ru' ? ruTranslations : enTranslations;
  
  return {
    title: t.metadata?.title || "Free Alexey Malyarevsky",
    description: t.metadata?.description || "Campaign to free Alexey Malyarevsky...",
    openGraph: {
      title: t.metadata?.ogTitle || t.metadata?.title || "Free Alexey Malyarevsky",
      description: t.metadata?.ogDescription || t.metadata?.description || "Campaign to free Alexey Malyarevsky...",
      locale: params.locale,
      type: 'website',
      url: `${baseUrl}/${params.locale}`,
    },
    alternates: {
      canonical: `${baseUrl}/${params.locale}`,
      languages: {
        'en': `${baseUrl}/en`,
        'ru': `${baseUrl}/ru`,
      },
    }
  };
}

export default function LocaleLayout({ // Renamed for clarity, but default export is what matters
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={inter.className}>
      <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
        <Navbar locale={locale} />
        {children}
        </ThemeProvider>
      </body>
    </html>
  );
}