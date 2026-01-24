import Link from "next/link";
import { Project } from "@/lib/projects";
import { ArrowUpRight, Github } from "lucide-react";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="group relative flex flex-col space-y-3">
      {/* Image Placeholder or Actual Image */}
      <div className="aspect-video w-full overflow-hidden rounded-lg border border-border bg-muted/50 transition-colors group-hover:border-foreground/20">
        {project.image ? (
          <img 
            src={project.image} 
            alt={project.title} 
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-muted-foreground/50">
            <span className="text-sm font-mono">No Image</span>
          </div>
        )}
      </div>

      <div className="space-y-1">
        <h3 className="font-semibold leading-none tracking-tight">
          <Link href={`/projects/${project.slug}`} className="hover:underline underline-offset-4 decoration-1">
            {project.title}
          </Link>
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {project.description}
        </p>
      </div>
      
      <div className="flex items-center gap-3 pt-1">
        {project.demoUrl && (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-medium text-foreground hover:underline"
          >
            Visit <ArrowUpRight className="h-3 w-3" />
          </a>
        )}
        {project.repoUrl && (
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Code <ArrowUpRight className="h-3 w-3" />
          </a>
        )}
      </div>
    </div>
  );
}
