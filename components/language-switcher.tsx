"use client";

import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const locales = [
  { code: "en", label: "EN" },
  { code: "ru", label: "RU" },
];

export default function LanguageSwitcher({ currentLocale }: { currentLocale: string }) {
  const pathname = usePathname();
  const router = useRouter();

  // Replace the locale in the pathname
  const getPathForLocale = (locale: string) => {
    const parts = pathname.split("/");
    if (locales.some(l => l.code === parts[1])) {
      parts[1] = locale;
    } else {
      parts.splice(1, 0, locale);
    }
    return parts.join("/") || "/";
  };

  return (
    <div className="flex items-center space-x-1 rounded-full bg-muted p-1 border border-border">
      {locales.map((locale) => (
        <button
          key={locale.code}
          onClick={() => router.push(getPathForLocale(locale.code))}
          className={cn(
            "px-3 py-1 rounded-full text-sm font-semibold transition-colors",
            currentLocale === locale.code
              ? "bg-primary text-primary-foreground shadow"
              : "text-muted-foreground hover:bg-accent"
          )}
          disabled={currentLocale === locale.code}
          aria-current={currentLocale === locale.code ? "page" : undefined}
        >
          {locale.label}
        </button>
      ))}
    </div>
  );
}