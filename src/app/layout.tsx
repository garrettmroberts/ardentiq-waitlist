import "@/styles/main.scss";
import { Roboto } from "next/font/google";

const roboto = Roboto({ 
  subsets: ["latin"], 
  variable: "--font-roboto",
  weight: ["300", "400", "500", "700"]
});

export const metadata = {
  title: "ArdentIQ LLC",
  description: "AI-powered data access for everyone",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>{children}</body>
    </html>
  );
}
