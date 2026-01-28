"use client";

import React from "react"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link2, Loader2, ArrowRight } from "lucide-react";
import { shortenUrl, type ShortenedUrl } from "@/lib/api";

interface UrlFormProps {
  onSuccess: (data: ShortenedUrl) => void;
  onError: (error: string) => void;
}

export function UrlForm({ onSuccess, onError }: UrlFormProps) {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!url.trim()) {
      onError("Please enter a URL");
      return;
    }

    setIsLoading(true);

    try {
      const response = await shortenUrl(url);

      if (response.success && response.data) {
        onSuccess(response.data);
        setUrl("");
      } else {
        onError(response.error || "Failed to shorten URL");
      }
    } catch {
      onError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Link2 className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Paste your long URL here..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="h-14 pl-12 pr-4 text-base bg-input border-border rounded-xl focus:ring-2 focus:ring-accent focus:border-accent transition-all placeholder:text-muted-foreground"
            disabled={isLoading}
          />
        </div>
        <Button
          type="submit"
          disabled={isLoading}
          className="h-14 px-8 text-base font-medium rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-primary/20"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Shortening...
            </>
          ) : (
            <>
              Shorten
              <ArrowRight className="ml-2 h-5 w-5" />
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
