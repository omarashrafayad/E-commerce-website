
import "./globals.css";
import Providers from "./providers";
import AuthInitializer from "@/features/auth/components/AuthInitializer";
import { getProfile } from "@/features/auth/api/auth";
import { Toaster } from "@/components/ui/sonner";

export const metadata = {
  title: "E-Commerce Store",
  description: "Experience premium shopping.",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { user, token } = await getProfile();

  return (
    <html lang="en">
      <body className="antialiased bg-background text-foreground">
        <Providers>
          <AuthInitializer user={user} token={token} />
          <Toaster />
        <main className="min-h-screen">
            {children}
        </main>
        </Providers>
      </body>
    </html>
  );
}