"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { MapPin, Info, Globe } from "lucide-react";
import { RiTelegramLine } from "react-icons/ri";
import emailjs from '@emailjs/browser';
import enTranslations from '../../public/locales/en/common.json';
import ruTranslations from '../../public/locales/ru/common.json';

export default function Home({ params }: { params: { locale: string } }) {
  const { locale } = params;
  console.log("Locale in app/[locale]/page.tsx:", locale);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    information: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      // Check if environment variables are defined
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !publicKey) {
        throw new Error('EmailJS configuration is missing. Please check your environment variables.');
      }

      // Prepare template parameters for EmailJS
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.information,
        to_email: 'nikita@kedrov.com',
        reply_to: formData.email
      };

      const result = await emailjs.send(
        serviceId,
        'template_ceohfpc',
        templateParams,
        publicKey
      );

      console.log('Email sent successfully:', result.text);
      setMessage('Message sent successfully!');
      setFormData({ name: '', email: '', information: '' });
    } catch (error) {
      console.error('Failed to send email:', error);
      setMessage('Failed to send message. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Simplified translation object based on locale from params
  const t = locale === 'ru' ? ruTranslations : enTranslations;

  // Fallback if translations aren't loaded correctly (shouldn't happen with imports)
  if (!t || !t.hero) {
    return <div>Error: Translations not loaded for locale: {locale}</div>;
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="/alexey-malyarevsky-court-cell.webp"
            alt={t.hero.backgroundImageAlt}
            fill
            className="object-cover brightness-50"
            unoptimized
            priority
          />
          {/* Subtle gradient overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background"></div>
        </div>
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4 animate-in fade-in slide-in-from-bottom-4 duration-1000 pt-20">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-6 tracking-tight drop-shadow-lg">{t.hero.title}</h1>
          <p className="text-xl md:text-3xl mb-8 font-medium text-gray-200 drop-shadow-md">{t.hero.subtitle}</p>
          <div className="w-24 h-1 bg-primary mx-auto mb-8 rounded-full"></div>
          <p className="text-lg md:text-xl mb-10 opacity-90 max-w-2xl mx-auto leading-relaxed">{t.hero.petitionDescription}</p>
          <Button size="lg" className="text-lg px-8 py-6 rounded-full shadow-xl hover:scale-105 transition-transform" asChild>
            <a href="https://chng.it/6v2QNt6ctg">{t.hero.ctaButton}</a>
          </Button>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{t.about.title}</h2>
            <div className="w-16 h-1 bg-primary mx-auto rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative group">
              <div className="absolute -inset-4 bg-primary/10 rounded-xl transform rotate-3 group-hover:rotate-0 transition-all duration-300"></div>
              <Image
                src="/malyarevsky-picket.webp"
                alt={t.about.imageAlt}
                width={600}
                height={700}
                unoptimized
                className="relative rounded-lg shadow-2xl object-cover"
              />
            </div>
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p className="text-foreground text-xl font-medium mb-8">
                {t.about.paragraph1}
              </p>
              <p>
                {t.about.paragraph2}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Videos Section */}
      <section className="py-24 bg-muted/50 relative overflow-hidden">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{t.videos.title}</h2>
            <div className="w-16 h-1 bg-primary mx-auto rounded-full"></div>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow bg-card">
              <div className="aspect-video w-full">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/1abE-UYwAc0?si=wYqli_7odrhRqJA0"
                  title="YouTube video player 1"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </Card>
            <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow bg-card">
              <div className="aspect-video w-full">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/PZ0z1sQ7oXM?si=h2dImHtj1mh29v7r"
                  title="YouTube video player 2"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{t.location.title}</h2>
            <div className="w-16 h-1 bg-primary mx-auto rounded-full"></div>
          </div>
          <Card className="p-8 max-w-3xl mx-auto shadow-xl border-border/50">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8 text-center md:text-left">
              <div className="p-4 bg-primary/10 rounded-full flex-shrink-0">
                <MapPin className="w-10 h-10 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-3">{t.location.cardTitle}</h3>
                <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                  {t.location.description}
                </p>
                <Button variant="default" size="lg" className="rounded-full px-8" asChild>
                  <a href="https://maps.app.goo.gl/9gG7uHHToLqDRgT48" target="_blank" rel="noopener noreferrer">
                    {t.location.mapButton}
                  </a>
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="take-action" className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{t.contactForm.title}</h2>
            <div className="w-16 h-1 bg-primary mx-auto rounded-full"></div>
          </div>
          <Card className="p-8 md:p-10 max-w-2xl mx-auto shadow-2xl border-0 bg-background">
            <form onSubmit={handleSubmit} className="space-y-6">
              <input type="hidden" name="to_email" value="nikita@kedrov.com" />
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">{t.contactForm.namePlaceholder}</label>
                  <Input
                    name="from_name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="bg-muted/50 border-0 focus-visible:ring-primary h-12"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">{t.contactForm.emailPlaceholder}</label>
                  <Input
                    name="from_email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="bg-muted/50 border-0 focus-visible:ring-primary h-12"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">{t.contactForm.informationPlaceholder}</label>
                <Textarea
                  name="message"
                  placeholder={locale === 'ru' ? 'Ваше сообщение...' : 'Your message here...'}
                  value={formData.information}
                  onChange={(e) => setFormData({ ...formData, information: e.target.value })}
                  rows={5}
                  required
                  className="bg-muted/50 border-0 focus-visible:ring-primary resize-none"
                />
              </div>
              <Button type="submit" size="lg" className="w-full text-lg h-14 rounded-xl" disabled={isLoading}>
                {isLoading ? (locale === 'ru' ? 'Отправка...' : 'Sending...') : t.contactForm.submitButton}
              </Button>
              {message && (
                <div className={`text-center p-4 rounded-xl text-sm font-medium transition-all ${message.includes('успешно') || message.includes('successfully') ? 'bg-green-500/10 text-green-600 dark:text-green-400' : 'bg-red-500/10 text-red-600 dark:text-red-400'}`}>
                  {message}
                </div>
              )}
            </form>
          </Card>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="py-24 bg-background w-full overflow-hidden border-t">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">{t.socialMedia.title}</h2>
          <div className="flex flex-wrap justify-center gap-6">
            <Link href="https://t.me/freemalyarevskiy" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="lg" className="rounded-full px-8 hover:bg-primary hover:text-primary-foreground transition-colors gap-2 h-14">
                <RiTelegramLine className="w-6 h-6" />
                <span className="text-lg">Telegram</span>
              </Button>
            </Link>
            <Link href="https://ovd.info/" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="lg" className="rounded-full px-8 hover:bg-primary hover:text-primary-foreground transition-colors gap-2 h-14">
                <Info className="w-6 h-6" />
                <span className="text-lg">OVD Info</span>
              </Button>
            </Link>
            <Link href="https://sotaproject.com/" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="lg" className="rounded-full px-8 hover:bg-primary hover:text-primary-foreground transition-colors gap-2 h-14">
                <Globe className="w-6 h-6" />
                <span className="text-lg">SOTA</span>
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}