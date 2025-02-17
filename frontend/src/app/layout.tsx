import AuthProvider from "@/components/AuthProvider"; // ✅ Use alias import
import { Toaster } from "sonner"; // ✅ Import Toaster from Sonner
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <AuthProvider>
                    {children}
                    <Toaster position="top-right" richColors /> {/* ✅ Add Toaster */}
                </AuthProvider>
            </body>
        </html>
    );
}
