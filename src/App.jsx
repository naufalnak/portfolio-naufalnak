import { useState, useEffect } from "react";
import Preloader from "./components/Preloader";
import BottomNav from "./components/BottomNav";
import Footer from "./components/Footer";
import MusicPlayer from "./components/MusicPlayer";
import HomePage from "./pages/HomePage";
import SkillsPage from "./pages/SkillsPage";
import ProjectsPage from "./pages/ProjectsPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import ExperiencePage from "./pages/ExperiencePage";
import GitHubPage from "./pages/GitHubPage";
import ContactPage from "./pages/ContactPage";

const pageTitles = {
  home: "Home",
  skills: "Skills",
  projects: "Projects",
  "project-detail": "Project",
  experience: "Experience",
  github: "GitHub",
  contact: "Contact",
};

export default function App() {
  const [nav, setNav] = useState({ page: "home" });

  const navigate = (page, slug = null) => {
    setNav(slug ? { page, slug } : { page });
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const title = pageTitles[nav.page] ?? "Home";
    document.title = `${title} | Naufal Andresya`;
  }, [nav.page]);

  const renderPage = () => {
    if (nav.page === "project-detail" && nav.slug) {
      return (
        <ProjectDetailPage
          slug={nav.slug}
          onBack={() => navigate("projects")}
          onNavigate={navigate}
        />
      );
    }
    switch (nav.page) {
      case "home":
        return <HomePage onNavigate={navigate} />;
      case "skills":
        return <SkillsPage />;
      case "projects":
        return <ProjectsPage onNavigate={navigate} />;
      case "experience":
        return <ExperiencePage />;
      case "github":
        return <GitHubPage />;
      case "contact":
        return <ContactPage />;
      default:
        return <HomePage onNavigate={navigate} />;
    }
  };

  const showNav = nav.page !== "project-detail";

  return (
    <Preloader>
      <div className="pf-root">
        <header className="pf-topbar">
          <span className="pf-topbar-logo">NAK_</span>
          <span className="pf-topbar-badge">
            <span className="pf-topbar-dot" />
            Open to work
          </span>
        </header>

        <main className="pf-content" key={nav.page + (nav.slug || "")}>
          {renderPage()}
        </main>

        <Footer />

        <MusicPlayer />

        {showNav && (
          <BottomNav active={nav.page} onNavigate={(page) => navigate(page)} />
        )}
      </div>
    </Preloader>
  );
}
