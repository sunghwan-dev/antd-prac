import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";
import ko_KR from "antd/locale/ko_KR";
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
          <ConfigProvider locale={ko_KR}>
            <AppLayout>
              {children}
            </AppLayout>
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
