import { useState, useEffect } from "react";
import BottomNav from "./components/BottomNav";
import Preloader from "./components/Preloader";
import Footer from "./components/Footer";
import MusicPlayer from "./components/MusicPlayer";
import Mascot from "./components/Mascot";
import HomePage from "./pages/HomePage";
import SkillsPage from "./pages/SkillsPage";
import ProjectsPage from "./pages/ProjectsPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import BlogDetailPage from "./pages/BlogDetailPage";
import ExperiencePage from "./pages/ExperiencePage";
import GitHubPage from "./pages/GitHubPage";
import ContactPage from "./pages/ContactPage";
import StatsPage from "./pages/StatsPage";
import StatsLoginPage from "./pages/StatsLoginPage";

const SIMPLE_PAGES = ["skills", "projects", "experience", "github", "contact"];

/* nav state -> URL path, e.g. { page: "blog-detail", slug: "foo" } -> "/blog/foo" */
function pathFromNav(nav) {
  if (nav.page === "project-detail" && nav.slug) return `/project/${nav.slug}`;
  if (nav.page === "blog-detail" && nav.slug) return `/blog/${nav.slug}`;
  if (nav.page === "home") return "/";
  if (nav.page === "stats-panel") return "/panel-stats";
  if (nav.page === "stats-login") return "/panel-stats-login";
  if (SIMPLE_PAGES.includes(nav.page)) return `/${nav.page}`;
  return "/";
}

/* URL path -> nav state, used on first load and on browser back/forward */
function navFromPath(pathname) {
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length === 0) return { page: "home" };
  if (parts[0] === "project" && parts[1])
    return { page: "project-detail", slug: parts[1] };
  if (parts[0] === "blog" && parts[1])
    return { page: "blog-detail", slug: parts[1] };
  if (parts[0] === "panel-stats") return { page: "stats-panel" };
  if (parts[0] === "panel-stats-login") return { page: "stats-login" };
  if (SIMPLE_PAGES.includes(parts[0])) return { page: parts[0] };
  return { page: "home" };
}

export default function App() {
  const [ready, setReady] = useState(
    () => sessionStorage.getItem("nak_preloader_seen") === "1",
  );
  const [nav, setNav] = useState(() => navFromPath(window.location.pathname));
  const [projectsTab, setProjectsTab] = useState("showcase");

  const PAGE_TITLES = {
    home: "Naufal Andresya Kholish",
    skills: "About | Naufal Andresya Kholish",
    projects: "Projects | Naufal Andresya Kholish",
    experience: "Experience | Naufal Andresya Kholish",
    github: "GitHub | Naufal Andresya Kholish",
    contact: "Contact | Naufal Andresya Kholish",
  };

  const applyTitle = (n) => {
    if (n.page === "blog-detail" && n.slug) {
      document.title = "Blog | Naufal Andresya Kholish";
    } else if (n.page === "project-detail" && n.slug) {
      document.title = "Project | Naufal Andresya Kholish";
    } else {
      document.title = PAGE_TITLES[n.page] || "Naufal Andresya Kholish";
    }
  };

  // set the correct tab/title on first load, and handle browser back/forward
  useEffect(() => {
    applyTitle(nav);
    const onPopState = () => {
      const next = navFromPath(window.location.pathname);
      setNav(next);
      applyTitle(next);
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const navigate = (page, slug = null, { replace = false } = {}) => {
    const newNav = slug ? { page, slug } : { page };
    setNav(newNav);
    window.scrollTo(0, 0);
    applyTitle(newNav);
    const path = pathFromNav(newNav);
    if (path !== window.location.pathname) {
      if (replace) {
        window.history.replaceState(null, "", path);
      } else {
        window.history.pushState(null, "", path);
      }
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
    if (nav.page === "blog-detail" && nav.slug) {
      return (
        <BlogDetailPage
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
        return (
          <ProjectsPage
            onNavigate={navigate}
            activeTab={projectsTab}
            onTabChange={setProjectsTab}
          />
        );
      case "experience":
        return <ExperiencePage />;
      case "github":
        return <GitHubPage />;
      case "contact":
        return <ContactPage />;
      case "stats-panel":
        return <StatsPage />;
      case "stats-login":
        return <StatsLoginPage />;
      default:
        return <HomePage onNavigate={navigate} />;
    }
  };

  const showNav =
    nav.page !== "project-detail" &&
    nav.page !== "blog-detail" &&
    nav.page !== "stats-panel" &&
    nav.page !== "stats-login";

  return (
    <>
      {!ready && (
        <Preloader
          onDone={() => {
            sessionStorage.setItem("nak_preloader_seen", "1");
            setReady(true);
          }}
        />
      )}

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
