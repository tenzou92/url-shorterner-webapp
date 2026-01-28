"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Copy,
  Check,
  ExternalLink,
  BarChart3,
  Link2,
  Trash2,
} from "lucide-react";
import type { ShortenedUrl } from "@/lib/api";

interface ResultCardProps {
  data: ShortenedUrl;
  onRemove: (id: string) => void;
}

export function ResultCard({ data, onRemove }: ResultCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(data.shortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      console.error("Failed to copy to clipboard");
    }
  };

  const truncateUrl = (url: string, maxLength: number = 50) => {
    if (url.length <= maxLength) return url;
    return url.substring(0, maxLength) + "...";
  };

  return (
    <Card className="p-4 sm:p-5 bg-card border-border rounded-xl overflow-hidden transition-all duration-300 hover:border-accent/50 group">
      <div className="flex flex-col gap-4">
        {/* Original URL */}
        <div className="flex items-center gap-3 text-muted-foreground">
          <Link2 className="h-4 w-4 shrink-0" />
          <span className="text-sm truncate" title={data.originalUrl}>
            {truncateUrl(data.originalUrl)}
          </span>
        </div>

        {/* Shortened URL */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
          <div className="flex-1 min-w-0">
            <a
              href={data.shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-semibold text-accent hover:underline flex items-center gap-2 transition-colors"
            >
              <span className="truncate">{data.shortUrl}</span>
              <ExternalLink className="h-4 w-4 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          </div>

          <div className="flex items-center gap-2">
            {/* Click count */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-secondary rounded-lg text-sm text-muted-foreground">
              <BarChart3 className="h-4 w-4" />
              <span>{data.clicks} clicks</span>
            </div>

            {/* Copy button */}
            <Button
              onClick={handleCopy}
              variant="outline"
              size="sm"
              className={`h-9 px-3 rounded-lg transition-all duration-200 ${
                copied
                  ? "bg-accent/20 border-accent text-accent"
                  : "hover:bg-secondary"
              }`}
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 mr-1.5" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 mr-1.5" />
                  Copy
                </>
              )}
            </Button>

            {/* Remove button */}
            <Button
              onClick={() => onRemove(data.id)}
              variant="ghost"
              size="sm"
              className="h-9 w-9 p-0 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
            >
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Remove</span>
            </Button>
          </div>
        </div>

        {/* Created timestamp */}
        <div className="text-xs text-muted-foreground">
          Created {data.createdAt.toLocaleString()}
        </div>
      </div>
    </Card>
  );
}
