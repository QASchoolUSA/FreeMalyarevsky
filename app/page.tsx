"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { MapPin, Mail, Twitter, Facebook, Instagram } from "lucide-react";
import { RiTelegramLine } from "react-icons/ri";


export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    information: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="/alexey-malyarevsky-court-cell.webp"
            alt="Background"
            fill
            className="object-cover brightness-50"
            priority
          />
        </div>
        <div className="relative z-10 text-center text-white max-w-3xl mx-auto px-4 opacity-60">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">Free Alexey Malyarevsky</h1>
          <p className="text-xl md:text-2xl mb-8">Political prisoner sentenced to 7 years for standing up against corruption</p>
          <Button size="lg" asChild>
            <a href="#take-action">Take Action Now</a>
          </Button>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center">About Alexey</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Image
                src="/malyarevsky-picket.jpeg"
                alt="Alexey Malyarevsky"
                width={500}
                height={600}
                className="rounded-lg"
              />
            </div>
            <div>
              <p className="text-lg mb-6">
                Alexey Malyarevsky, a brave advocate for democracy and transparency in Russia,
                was sentenced to 7 years in prison on October 23, 2023. His crime? Standing up
                against corruption and expressing his political views through peaceful protest
                and a modest $150 donation to Navalny&apos;s anti-corruption foundation.
              </p>
              <p className="text-lg mb-6">
                This harsh sentence represents a clear violation of human rights and freedom
                of expression. Alexey&apos;s case has become a symbol of the ongoing struggle
                for democracy in Russia.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Videos Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center">Watch Videos</h2>
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
          <h2 className="text-4xl font-bold mb-12 text-center">Current Location</h2>
          <Card className="p-6 max-w-2xl mx-auto">
            <div className="flex items-start gap-4">
              <MapPin className="w-6 h-6 text-primary" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Correctional Colony</h3>
                <p className="text-muted-foreground mb-4">
                  Alexey is currently being held at Correctional Colony No. 1, located in Orenburg, Russia.
                  This high-security facility is known for housing political prisoners.
                </p>
                <Button variant="outline" asChild>
                  <a href="https://maps.app.goo.gl/9gG7uHHToLqDRgT48" target="_blank" rel="noopener noreferrer">
                    View on Map
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
          <h2 className="text-4xl font-bold mb-12 text-center">Share Information</h2>
          <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-6">
            <div>
              <Input
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div>
              <Input
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div>
              <Textarea
                placeholder="Share any information you have about Alexey..."
                value={formData.information}
                onChange={(e) => setFormData({ ...formData, information: e.target.value })}
                rows={5}
              />
            </div>
            <Button type="submit" className="w-full">Submit Information</Button>
          </form>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="py-20 bg-muted w-full overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-12">Stay Updated</h2>
          <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-8">
            <Button variant="outline" size="lg" className="gap-2">
              <Twitter className="w-5 h-5" />
              Twitter
            </Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto gap-2">
              <RiTelegramLine className="w-5 h-5" />
              Telegram
            </Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto gap-2">
              <Instagram className="w-5 h-5" />
              Instagram
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}