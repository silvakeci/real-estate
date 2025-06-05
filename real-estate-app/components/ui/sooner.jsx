'use client';

import { useTheme } from "next-themes";
import { Toaster as SonnerToaster } from "sonner"; // <- Import from the actual sonner lib

const Toaster = ({ ...props }) => {
  const { theme = "system" } = useTheme();

  return (
    <SonnerToaster
      theme={theme}
      className="toaster group"
      style={{
        "--normal-bg": "var(--popover)",
        "--normal-text": "var(--popover-foreground)",
        "--normal-border": "var(--border)",
      }}
      {...props}
    />
  );
};

export { Toaster };
