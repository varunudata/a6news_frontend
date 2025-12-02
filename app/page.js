import Navbar from "./components/layout/Navbar";
import NavContents from "./components/layout/NavContents";
import Hero from "./components/home/Hero";
import Latest from "./components/home/Latest";
import Posts from "./components/layout/Posts";
import Footer from "./components/layout/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <NavContents />
        <Hero />
        <Latest />
        <Posts />
      </main>
      <Footer />
    </>
  );
}
