"use client";

import { Link2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="p-2 bg-accent/10 rounded-lg">
              <Link2 className="h-5 w-5 text-accent" />
            </div>
            <span className="text-xl font-bold text-foreground">Sniplink</span>
          </div>

          {/* Navigation */}
          <nav className="hidden sm:flex items-center gap-6">
            <a
              href="#features"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Features
            </a>
            <a
              href="#pricing"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Pricing
            </a>
            <a
              href="#docs"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Docs
            </a>
          </nav>

          {/* Auth buttons */}
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Log in
            </Button>
            <Button className="text-sm bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
