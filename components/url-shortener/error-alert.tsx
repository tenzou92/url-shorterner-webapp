"use client";

import { AlertCircle, X } from "lucide-react";

interface ErrorAlertProps {
  message: string;
  onDismiss: () => void;
}

export function ErrorAlert({ message, onDismiss }: ErrorAlertProps) {
  return (
    <div className="flex items-center gap-3 p-4 bg-destructive/10 border border-destructive/30 rounded-xl text-destructive animate-in fade-in slide-in-from-top-2 duration-300">
      <AlertCircle className="h-5 w-5 shrink-0" />
      <span className="flex-1 text-sm">{message}</span>
      <button
        onClick={onDismiss}
        className="p-1 rounded-lg hover:bg-destructive/20 transition-colors"
        aria-label="Dismiss error"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
