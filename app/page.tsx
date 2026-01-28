"use client"
import { useState } from "react";
import { Header } from "@/components/url-shortener/header";
import { Footer } from "@/components/url-shortener/footer";
import { UrlForm } from "@/components/url-shortener/url-form";
import { ResultCard } from "@/components/url-shortener/result-card";
import { ErrorAlert } from "@/components/url-shortener/error-alert";
import { FeatureCard } from "@/components/url-shortener/feature-card";
import {
  Zap,
  BarChart3,
  Shield,
  Globe,   
  Sparkles,
  MousePointer,
} from "lucide-react";
import type { ShortenedUrl } from "@/lib/api";

export default function Home() {
  const [results, setResults] = useState<ShortenedUrl[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSuccess = (data: ShortenedUrl) => {
    setResults((prev) => [data, ...prev]);
    setError(null);
  };

  const handleError = (errorMessage: string) => {
    setError(errorMessage);
  };

  const handleRemove = (id: string) => {
    setResults((prev) => prev.filter((r) => r.id !== id));
  };

  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description:
        "Create shortened URLs instantly with our optimized infrastructure.",
    },
    {
      icon: BarChart3,
      title: "Click Analytics",
      description:
        "Track every click with detailed analytics and insights.",
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description:
        "Enterprise-grade security with 99.9% uptime guarantee.",
    },
    {
      icon: Globe,
      title: "Custom Domains",
      description:
        "Use your own branded domain for a professional appearance.",
    },
    {
      icon: Sparkles,
      title: "Smart Links",
      description:
        "Create dynamic links that adapt based on user context.",
    },
    {
      icon: MousePointer,
      title: "QR Codes",
      description:
        "Generate scannable QR codes for your shortened links.",
    },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/10 border border-accent/20 rounded-full text-sm text-accent mb-6">
              <Sparkles className="h-4 w-4" />
              <span>Simple. Fast. Reliable.</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight text-balance">
              Shorten your links,
              <br />
              <span className="text-accent">amplify your reach</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto text-pretty">
              Create short, memorable links in seconds. Track clicks, analyze
              performance, and share everywhere with confidence.
            </p>

            {/* URL Form */}
            <div className="max-w-2xl mx-auto mb-8">
              <UrlForm onSuccess={handleSuccess} onError={handleError} />
            </div>

            {/* Error Alert */}
            {error && (
              <div className="max-w-2xl mx-auto mb-6">
                <ErrorAlert message={error} onDismiss={() => setError(null)} />
              </div>
            )}

            {/* Results */}
            {results.length > 0 && (
              <div className="max-w-2xl mx-auto space-y-4">
                {results.map((result) => (
                  <ResultCard
                    key={result.id}
                    data={result}
                    onRemove={handleRemove}
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-border bg-card/30">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
                  10M+
                </div>
                <div className="text-sm text-muted-foreground">
                  Links Created
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
                  500M+
                </div>
                <div className="text-sm text-muted-foreground">
                  Clicks Tracked
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
                  99.9%
                </div>
                <div className="text-sm text-muted-foreground">Uptime</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
                  150+
                </div>
                <div className="text-sm text-muted-foreground">Countries</div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Everything you need
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Powerful features to help you manage, track, and optimize your
                links at scale.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature) => (
                <FeatureCard
                  key={feature.title}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-border">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Ready to get started?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
              Join thousands of businesses using Sniplink to create better
              links.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="px-8 py-3 bg-primary text-primary-foreground font-medium rounded-xl hover:bg-primary/90 transition-all duration-200 hover:scale-[1.02]">
                Start for Free
              </button>
              <button className="px-8 py-3 bg-secondary text-secondary-foreground font-medium rounded-xl hover:bg-secondary/80 transition-colors">
                View Documentation
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
