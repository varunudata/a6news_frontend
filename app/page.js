"use client";

import { useState } from "react";
import Navbar from "./components/navbar/page";
import NavContents from "./components/navContents/page";
import Hero from "./components/hero/page";
import Latest from "./components/latest/page";
import Posts from "./components/posts/page";

export default function Home() {
  const [hello, setHello] = useState();
  return (
    <div>
      <Navbar />
      <NavContents />
      <Hero />
      <Latest />
      <Posts />
    </div>
  );
}
