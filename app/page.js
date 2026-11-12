import Navbar from "./components/layout/Navbar";
import NavContents from "./components/layout/NavContents";
import Hero from "./components/home/Hero";
import Posts from "./components/layout/Posts";
import Footer from "./components/layout/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <NavContents />
      <main className="flex-1">
        <Hero />
        <Posts />
      </main>
      <Footer />
    </div>
  );
}
