import { Inter } from "next/font/google";
import './globals.css'; // globals.cc has the no scroll bar rule

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Coursework Wizard",
  description: "Visualise and manage your coursework deadlines",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <main>
        {children}
      </main>
        </body>
    </html>
  );
}
