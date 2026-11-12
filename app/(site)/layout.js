import Navbar from "../components/layout/Navbar";
import NavContents from "../components/layout/NavContents";
import Footer from "../components/layout/Footer";

export default function SiteLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <NavContents />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

