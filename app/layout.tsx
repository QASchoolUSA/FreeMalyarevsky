import "./globals.css"; // Your global styles
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider"; // Assuming this doesn't need locale directly

const inter = Inter({ subsets: ["latin"] });

// Metadata here should be general, not locale-specific unless handled differently
export const metadata = {
  title: "Free Alexey Malyarevsky",
  description: "Campaign to free Alexey Malyarevsky...",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Default lang, or detect and set differently if needed before locale context is established
    <html lang="en" suppressHydrationWarning> 
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* Navbar might need to be moved to the locale-specific layout if it depends on locale */}
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}