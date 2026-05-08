import Navbar from "@/components/layout/Navbar/Navbar";
import Hero from "@/components/home/Hero/Hero";
import About from "@/components/home/About/About";
import Clients from "@/components/home/Clients/Clients";
import Projects from "@/components/home/Projects/Projects";
import Advisory from "@/components/home/Advisory/Advisory";
import Values from "@/components/home/Values/Values";





export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Clients />
        <Projects />
        <Advisory />
        <Values />
      </main>
    </>
  );
}