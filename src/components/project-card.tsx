import Link from "next/link";
import { Project } from "@/lib/projects";
import { ArrowUpRight, Github } from "lucide-react";
import { Tag } from "@/components/ui/tag";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="group relative flex flex-col space-y-3 rounded-lg p-3 antigravity">
      {/* Image Placeholder or Actual Image */}
      <div className="aspect-video w-full overflow-hidden rounded-md border border-border bg-muted/50 transition-colors">
        {project.image ? (
          <img 
            src={project.image} 
            alt={project.title} 
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-muted-foreground/50 bg-card">
            <span className="text-sm font-mono opacity-50">No Image</span>
          </div>
        )}
      </div>

      <div className="space-y-1">
        <h3 className="font-semibold leading-none tracking-tight font-mono text-foreground flex items-center gap-2">
          <Link href={`/projects/${project.slug}`} className="hover:text-primary transition-colors after:absolute after:inset-0">
            {project.title}
          </Link>
          <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {project.description}
        </p>
        
        {project.tags && project.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
                {project.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="text-[10px] text-muted-foreground border border-border px-1.5 py-0.5 rounded bg-background/50">
                        {tag}
                    </span>
                ))}
            </div>
        )}
      </div>
    </div>
  );
}
