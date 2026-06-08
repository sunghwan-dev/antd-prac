import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ThemeProvider } from "@/components/ThemeProvider";
import AppLayout from "@/components/AppLayout";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Admin Dashboard Portfolio",
  description: "Next.js + Ant Design + ECharts + AG-Grid Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={inter.className} style={{ margin: 0 }}>
        <AntdRegistry>
          <ThemeProvider>
            <AppLayout>
              {children}
            </AppLayout>
          </ThemeProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
