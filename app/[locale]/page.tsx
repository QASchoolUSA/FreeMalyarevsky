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
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="/alexey-malyarevsky-court-cell.webp"
            alt={t.hero.backgroundImageAlt}
            fill
            className="object-cover brightness-50"
            unoptimized
            priority
          />
        </div>
        <div className="relative z-10 text-center text-white max-w-3xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">{t.hero.title}</h1>
          <p className="text-xl md:text-2xl mb-8">{t.hero.subtitle}</p>
          <p className="text-lg mb-8 opacity-90">{t.hero.petitionDescription}</p>
          <Button size="lg" asChild>
            <a href="https://chng.it/6v2QNt6ctg">{t.hero.ctaButton}</a>
          </Button>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center">{t.about.title}</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Image
                src="/malyarevsky-picket.webp"
                alt={t.about.imageAlt}
                width={500}
                height={600}
                unoptimized
                className="rounded-lg"
              />
            </div>
            <div>
              <p className="text-lg mb-6">
                {t.about.paragraph1}
              </p>
              <p className="text-lg mb-6">
                {t.about.paragraph2}
              </p>
              <p className="text-lg mb-6">
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Videos Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center">{t.videos.title}</h2>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="aspect-video w-full">
              <iframe
                className="rounded-lg w-full h-full"
                src="https://www.youtube.com/embed/1abE-UYwAc0?si=wYqli_7odrhRqJA0"
                title="YouTube video player 1"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="aspect-video w-full">
              <iframe
                className="rounded-lg w-full h-full"
                src="https://www.youtube.com/embed/PZ0z1sQ7oXM?si=h2dImHtj1mh29v7r"
                title="YouTube video player 2"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center">{t.location.title}</h2>
          <Card className="p-6 max-w-2xl mx-auto">
            <div className="flex items-start gap-4">
              <MapPin className="w-6 h-6 text-primary" />
              <div>
                <h3 className="text-xl font-semibold mb-2">{t.location.cardTitle}</h3>
                <p className="text-muted-foreground mb-4">
                  {t.location.description}
                </p>
                <Button variant="outline" asChild>
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
      <section id="take-action" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center">{t.contactForm.title}</h2>
          <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-6">
            <input type="hidden" name="to_email" value="nikita@kedrov.com" />
            <div>
              <Input
                name="from_name"
                placeholder={t.contactForm.namePlaceholder}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div>
              <Input
                name="from_email"
                type="email"
                placeholder={t.contactForm.emailPlaceholder}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <div>
              <Textarea
                name="message"
                placeholder={t.contactForm.informationPlaceholder}
                value={formData.information}
                onChange={(e) => setFormData({ ...formData, information: e.target.value })}
                rows={5}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (locale === 'ru' ? 'Отправка...' : 'Sending...') : t.contactForm.submitButton}
            </Button>
            {message && (
              <div className={`text-center p-3 rounded ${message.includes('успешно') || message.includes('successfully') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {message}
              </div>
            )}
          </form>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="py-20 bg-muted w-full overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-12">{t.socialMedia.title}</h2>
          <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-8">
            <Link href="https://t.me/freemalyarevskiy" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="lg" className="w-full sm:w-auto gap-2">
                <RiTelegramLine className="w-5 h-5" />
                Telegram
              </Button>
            </Link>
            <Link href="https://ovd.info/" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="lg" className="w-full sm:w-auto gap-2">
                <Info className="w-5 h-5" />
                OVD Info
              </Button>
            </Link>
            <Link href="https://sotaproject.com/" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="lg" className="w-full sm:w-auto gap-2">
                <Globe className="w-5 h-5" />
                SOTA
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}