import type { ReactNode } from "react";
import { Navbar } from "../navbar";
import { Footer } from "../footer"; // tambahkan import

interface LayoutProps {
  children: ReactNode;
  onLoginClick: () => void;
}

export const Layout = ({ children, onLoginClick }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar onLoginClick={onLoginClick} />

      {/* Page Content */}
      <main className="flex-grow pt-20 mb-16">{children}</main>

      {/* Footer */}
      <Footer />
    </div>
  );
};
