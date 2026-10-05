import { useState } from "react";
import Icon from "./Icon";
import ProjectShowcase from "./ProjectShowcase";
import Reveal from "./Reveal";
import {
  PROJECTS,
  PROJECT_CATEGORY_LABELS,
  SERVICE_PAGES,
  type ProjectCategory,
  type WorkItem,
} from "../siteData";

// Projects are added one at a time in PROJECTS (siteData.ts); each shows
// its photos as an automatic slideshow. The same section appears on the home
// page and on every service page.
const PROJECT_CATEGORIES: ProjectCategory[] = ["private", "institutional"];
const INSTITUTIONAL = SERVICE_PAGES["development-infrastructure"];

export default function ProjectsSection({
  onOpenPhoto,
}: {
  onOpenPhoto: (items: WorkItem[], index: number) => void;
}) {
  const [projectCategory, setProjectCategory] = useState<ProjectCategory>("private");
  const projects = PROJECTS.filter((project) => project.category === projectCategory);
  const hasPortfolioItems = projects.length > 0;

  return (
    <section id="projects" className="hPortfolio" aria-labelledby="projects-title">
      <div className="container">
        <Reveal className="portfolioHead">
          <div>
            <p className="eyebrow">{PROJECT_CATEGORY_LABELS[projectCategory]}</p>
            <h2 id="projects-title" className="displayHeading">
              פרויקטים נבחרים:
            </h2>
          </div>

          <div className="projectCategorySwitch" role="tablist" aria-label="סוג פרויקטים">
            {PROJECT_CATEGORIES.map((value) => (
              <button
                key={value}
                id={`projects-tab-${value}`}
                type="button"
                role="tab"
                className="projectCategoryTab"
                aria-selected={projectCategory === value}
                aria-controls={`projects-panel-${value}`}
                tabIndex={projectCategory === value ? 0 : -1}
                onClick={() => setProjectCategory(value)}
              >
                {value === "private" ? "פרטיים" : "מוסדיים וציבוריים"}
              </button>
            ))}
          </div>
        </Reveal>

        <div
          key={projectCategory}
          id={`projects-panel-${projectCategory}`}
          className="portfolioPanel"
          role="tabpanel"
          aria-labelledby={`projects-tab-${projectCategory}`}
        >
          {hasPortfolioItems ? (
            <div className="projectList">
              {projects.map((project, index) => (
                <Reveal key={project.id}>
                  <ProjectShowcase
                    project={project}
                    number={index}
                    onOpenPhoto={onOpenPhoto}
                  />
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="portfolioEmpty" aria-live="polite">
              <p className="portfolioEmptyKicker">פרויקטים מוסדיים וציבוריים</p>
              <p className="portfolioEmptyText">פרויקטים נוספים יעלו בקרוב.</p>
              <a className="portfolioEmptyLink" href={INSTITUTIONAL.path}>
                לשירותי פיתוח ותשתיות <Icon name="arrow" />
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
