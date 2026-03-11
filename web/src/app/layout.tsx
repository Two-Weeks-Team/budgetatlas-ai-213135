import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "BudgetAtlas AI",
  description: "Instant, private AI budgeting that turns household numbers into a visual money plan\u2014no cloud, no\u2011cost, no\u2011compromise.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
