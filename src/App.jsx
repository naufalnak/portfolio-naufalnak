import { useState } from "react";
import BottomNav from "./components/BottomNav";
import Preloader from "./components/Preloader";
import Footer from "./components/Footer";
import MusicPlayer from "./components/MusicPlayer";
import Mascot from "./components/Mascot";
import HomePage from "./pages/HomePage";
import SkillsPage from "./pages/SkillsPage";
import ProjectsPage from "./pages/ProjectsPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import ExperiencePage from "./pages/ExperiencePage";
import GitHubPage from "./pages/GitHubPage";
import ContactPage from "./pages/ContactPage";

export default function App() {
  const [ready, setReady] = useState(false);
  const [nav, setNav] = useState({ page: "home" });

  const PAGE_TITLES = {
    home: "Naufal Andresya Kholish | Portfolio",
    skills: "About | Naufal Andresya Kholish",
    projects: "Projects | Naufal Andresya Kholish",
    experience: "Experience | Naufal Andresya Kholish",
    github: "GitHub | Naufal Andresya Kholish",
    contact: "Contact | Naufal Andresya Kholish",
  };

  const navigate = (page, slug = null) => {
    setNav(slug ? { page, slug } : { page });
    window.scrollTo(0, 0);
    if (slug) {
      document.title = "Project | Naufal Andresya Kholish";
    } else {
      document.title = PAGE_TITLES[page] || "Naufal Andresya Kholish";
    }
  };

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
    <>
      {!ready && <Preloader onDone={() => setReady(true)} />}

      <div
        className="pf-root"
        style={{ opacity: ready ? 1 : 0, transition: "opacity 0.3s ease" }}>
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
        <Mascot currentPage={nav.page} />

        {showNav && (
          <BottomNav active={nav.page} onNavigate={(page) => navigate(page)} />
        )}
      </div>
    </>
  );
}
