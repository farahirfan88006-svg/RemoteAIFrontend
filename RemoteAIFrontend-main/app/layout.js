import { Space_Grotesk, Inter, IBM_Plex_Mono } from "next/font/google";
import Navbar from "@/components/client/Navbar";
import Footer from "@/components/server/Footer";
import { siteConfig } from "@/lib/seo/siteConfig";
import { buildOrganizationSchema, buildWebsiteSchema } from "@/lib/seo/schemas";
import { AuthProvider } from "@/lib/auth/AuthContext";
import { SavedJobsProvider } from "@/lib/savedJobs/SavedJobsContext";
import "./globals.css";

// Display face — used for headings via the --font-space-grotesk CSS variable.
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

// Body face.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Utility/mono face — used for tags, eyebrows, and metadata-style labels.
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

// Centralized metadata, built from the single siteConfig source of truth.
// Individual pages can override/extend this via their own `metadata` export.
export const metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [{ url: siteConfig.socialImage }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.socialImage],
  },
};

export default function RootLayout({ children }) {
  const jsonLd = [buildOrganizationSchema(), buildWebsiteSchema()];

  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${plexMono.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <AuthProvider>
          <SavedJobsProvider>
            <Navbar />
            <main>{children}</main>
            <Footer />
          </SavedJobsProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
