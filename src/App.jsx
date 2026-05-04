import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import GitHubStats from './components/GitHubStats'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  useEffect(() => {
    // Lenis smooth scroll (optional — uncomment jika ingin smooth scroll)
    // import('lenis').then(({ default: Lenis }) => {
    //   const lenis = new Lenis()
    //   function raf(time) { lenis.raf(time); requestAnimationFrame(raf) }
    //   requestAnimationFrame(raf)
    // })
  }, [])

  return (
    <div className="min-h-screen bg-dark-900">
      {/* Scan line effect */}
      <div className="scan-overlay" />

      <Navbar />

      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <GitHubStats />
        <Contact />
      </main>

      <Footer />
    </div>
  )
}
