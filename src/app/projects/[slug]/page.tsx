import { getProjectBySlug, getAllProjects } from "@/lib/projects";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import Link from "next/link";
import { format } from "date-fns";
import { ArrowLeft, ArrowUpRight, Github } from "lucide-react";
import remarkGfm from "remark-gfm";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectPage({ params }: PageProps) {
  const resolvedParams = await params;
  const project = getProjectBySlug(resolvedParams.slug);

  if (!project) notFound();

  return (
    <article className="min-h-screen max-w-4xl mx-auto p-8 md:p-12 lg:p-24">
      <Link
        href="/projects"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Projects
      </Link>

      <header className="mb-12 space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold font-mono">{project.title}</h1>
        <p className="text-xl text-muted-foreground">{project.description}</p>
        
        <div className="flex flex-wrap items-center gap-4 text-sm mt-4">
          {project.tags && project.tags.map((tag) => (
             <span key={tag} className="tag">
                {tag}
             </span>
          ))}
          
          <div className="flex items-center gap-4 ml-auto">
             {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-foreground text-background rounded-md font-medium hover:bg-foreground/90 transition-colors"
            >
              Visit Demo <ArrowUpRight className="ml-2 w-4 h-4" />
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 border border-border rounded-md font-medium hover:bg-accent transition-colors"
            >
              <Github className="mr-2 w-4 h-4" />
              View Code
            </a>
          )}
          <time className="text-muted-foreground ml-auto font-mono">
            {format(new Date(project.date), "MMMM yyyy")}
          </time>
        </div>
      </div>

        {project.image && (
          <div className="w-full aspect-video rounded-xl overflow-hidden border border-border bg-muted/50 mt-8">
             <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
          </div>
        )}
      </header>

      <div className="prose dark:prose-invert max-w-none prose-lg prose-headings:font-mono prose-a:text-blue-500 hover:prose-a:text-blue-600 transition-colors">
        <MDXRemote 
          source={project.content} 
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
            },
          }}
        />
      </div>
    </article>
  );
}
