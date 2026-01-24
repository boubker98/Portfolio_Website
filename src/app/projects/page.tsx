import { getAllProjects } from "@/lib/projects";
import { ProjectCard } from "@/components/project-card";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <main className="min-h-screen p-8 md:p-12 lg:p-24 max-w-4xl mx-auto">
      <Link
        href="/"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-12 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back Home
      </Link>

      <header className="mb-16">
        <h1 className="text-4xl font-bold font-mono mb-4">Projects</h1>
        <p className="text-muted-foreground">
          A collection of my work, side projects, and experiments.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </main>
  );
}
