import Hero from "@/components/home/Hero/Hero";
import About from "@/components/home/About/About";
import Clients from "@/components/home/Clients/Clients";
import Projects from "@/components/home/Projects/Projects";
import Advisory from "@/components/home/Advisory/Advisory";
import Values from "@/components/home/Values/Values";
import Quality from "@/components/home/Quality/Quality";

export default function Home() {
  return (
    <main className="page-main">
      <Hero />
      <About />
        <Quality />
      <Clients />
      <Projects />
    
      <Advisory />
      <Values />
    </main>
  );
}