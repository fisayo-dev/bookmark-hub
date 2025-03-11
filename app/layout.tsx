import type { Metadata } from "next";
import { ReactNode } from "react";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { Toaster } from "sonner";
import QueryProvider from "@/components/QueryProvider";

export const metadata: Metadata = {
    title: "Bookmark Hub",
    description: "Effortlessly save and organize your favorite links—just type in the URL and keep your bookmarks handy",
};

export default async function RootLayout({children,}: Readonly<{
    children: ReactNode;
}>) {
    const session = await auth();

    return (
        <html lang="en">
        <body>
        <QueryProvider>
            <SessionProvider session={session}>
                <Toaster className="sooner-toast" />
                {children}
            </SessionProvider>
        </QueryProvider>
        </body>
        </html>
    );
}
