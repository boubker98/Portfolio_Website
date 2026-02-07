import { ProjectCard } from "@/components/project-card";
import { Tag } from "@/components/ui/tag";
import { getAllProjects } from "@/lib/projects";
import { Mail, Linkedin, Github } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import experienceData from "@/data/experience.json";

export default function Home() {
  const allProjects = getAllProjects();
  const featuredProjects = allProjects.slice(0, 4);

  // Separate jobs and internships based on the structure observed in the original file
  const jobs = experienceData.filter(item => item.type === "job");
  const internships = experienceData.filter(item => item.type === "internship");

  return (
    <main className="min-h-screen p-8 md:p-12 max-w-3xl mx-auto font-sans">
      
      {/* Header / Contact Info */}
      <header className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="mb-4">
            <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-2">
            Boubker Ennajy <span className="animate-blink text-primary">_</span>
            </h1>
            <p className="text-xl text-muted-foreground">
            Data Engineer
            </p>
        </div>

        <div className="flex gap-4">
          <a 
            href="mailto:boubkerennajy@gmail.com" 
            className="p-2 -ml-2 rounded-md text-muted-foreground hover:bg-muted hover:text-primary transition-colors duration-200"
            aria-label="Email"
          >
            <Mail size={20} />
          </a>
          <a 
            href="https://linkedin.com/in/b-ennajy" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="p-2 rounded-md text-muted-foreground hover:bg-muted hover:text-primary transition-colors duration-200"
             aria-label="LinkedIn"
          >
            <Linkedin size={20} />
          </a>
          <a 
            href="https://github.com/boubker98" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="p-2 rounded-md text-muted-foreground hover:bg-muted hover:text-primary transition-colors duration-200"
             aria-label="GitHub"
          >
            <Github size={20} />
          </a>
        </div>
      </header>

      {/* Professional Summary / Impact Phrase */}
      <section className="mb-16 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-75 fill-mode-both">
        <p className="text-2xl font-medium text-primary mb-6 leading-tight">
          Engineering Scalable Data Intelligence.
        </p>
        <p className="text-muted-foreground leading-relaxed max-w-2xl text-lg">
          I build the engines that turn raw data into decisions. Specializing in scalable pipelines and distributed systems, I bridge the gap between engineering complexity and business value. My focus is simple: reliable architecture, high data quality, and shipping production-grade code.
        </p>
      </section>

      {/* Experience Section - Resume Style */}
      <section className="mb-16 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100 fill-mode-both">
        <h2 className="text-lg font-bold uppercase tracking-wider text-muted-foreground mb-6 border-b border-border pb-2">
          Experience
        </h2>
        
        <div className="space-y-8">
            {/* Jobs */}
            {jobs.map((job, index) => (
              <div key={index} className="group hover:bg-muted/30 p-4 -mx-4 rounded-lg transition-colors duration-200">
                <div className="flex justify-between items-baseline mb-2">
                  <h3 className="font-semibold text-foreground text-lg group-hover:text-primary transition-colors">{job.company}</h3>
                  <span className="font-mono text-sm text-muted-foreground">{job.period}</span>
                </div>
                <p className="text-md text-primary mb-3 font-medium">{job.role}</p>
                {Array.isArray(job.description) ? (
                  <ul className="list-disc list-outside ml-5 space-y-1 text-muted-foreground text-sm leading-relaxed">
                    {job.description.map((desc, i) => (
                      <li key={i}>{desc}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-muted-foreground">{job.description}</p>
                )}
              </div>
            ))}

            {/* Internships Grouped */}
            {internships.length > 0 && (
              <div className="p-4 -mx-4">
                 <h3 className="font-semibold text-foreground text-lg mb-6 flex items-center gap-2">
                    Previous Internships <span className="h-px bg-border flex-1 opacity-50"></span>
                 </h3>
                 <div className="space-y-8 relative border-l border-border/50 ml-2 pl-6">
                    {internships.map((internship, index) => (
                      <div key={index} className="relative">
                        <span className="absolute -left-[29px] top-1.5 h-2 w-2 rounded-full bg-border ring-4 ring-background"></span>
                        <div className="flex justify-between items-baseline mb-1">
                           <h4 className="font-medium text-foreground hover:text-primary transition-colors">{internship.company}</h4>
                           <span className="font-mono text-xs text-muted-foreground">{internship.period}</span>
                        </div>
                        <p className="text-sm text-muted-foreground italic mb-1">{internship.role}</p>
                        {Array.isArray(internship.description) ? (
                          <ul className="list-disc list-outside ml-5 space-y-1 text-muted-foreground text-sm leading-relaxed">
                            {internship.description.map((desc, i) => (
                              <li key={i}>{desc}</li>
                            ))}
                          </ul>
                        ) : (
                           <p className="text-sm text-muted-foreground">{internship.description}</p>
                        )}
                      </div>
                    ))}
                 </div>
              </div>
            )}
        </div>
      </section>

      {/* Projects Section - GitHub Pinned Style */}
      <section className="mb-16 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200 fill-mode-both">
        <div className="flex items-center justify-between border-b border-border pb-2 mb-6">
            <h2 className="text-lg font-bold uppercase tracking-wider text-muted-foreground">
            Projects
            </h2>
            <Link href="/projects" className="text-xs font-mono text-muted-foreground hover:text-primary hover:underline transition-colors flex items-center gap-1 group">
            View All <span className="group-hover:translate-x-0.5 transition-transform">&rarr;</span>
            </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      {/* Skills Section - Compact */}
      <section className="mb-16 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300 fill-mode-both">
        <h2 className="text-lg font-bold uppercase tracking-wider text-muted-foreground mb-6 border-b border-border pb-2">
           Technical Skills
        </h2>
        <div className="space-y-4">
            {[
                { name: "Programming", items: ["Python", "SQL", "Bash", "JavaScript", "Typescript"] },
                { name: "Data Engineering", items: ["Pandas", "Polars", "Dask", "PySpark", "Airflow", "Prefect", "dbt"] },
                { name: "Databases", items: ["PostgreSQL", "MySQL", "MS SQL Server", "DuckDB"] },
                { name: "Data Modeling", items: ["Star Schema", "Snowflake Schema", "Data Vault", "Normalization"] },
                { name: "Data Visualization", items: ["DAX", "Power BI", "Matplotlib", "Seaborn"] },
                { name: "Data Quality", items: ["Pandera", "Great Expectations", "Pytest", "Pydantic", "dbt test"] },
                { name: "Cloud & DevOps", items: ["AWS", "Azure", "Docker", "Terraform", "Git"] },
            ].map((category) => (
                <div key={category.name} className="flex flex-col md:flex-row md:items-start gap-2 hover:bg-muted/20 p-2 -mx-2 rounded transition-colors duration-200">
                    <span className="text-sm font-semibold text-foreground min-w-[140px] pt-1">
                        {category.name}:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                        {category.items.map(item => (
                            <Tag key={item} variant="secondary" className="text-xs bg-muted/50 text-muted-foreground border-transparent hover:border-primary/30 hover:text-primary transition-colors cursor-default">
                                {item}
                            </Tag>
                        ))}
                    </div>
                </div>
            ))}
        </div>
      </section>

      {/* Education - List Style */}
      <section className="mb-16 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-500 fill-mode-both">
        <h2 className="text-lg font-bold uppercase tracking-wider text-muted-foreground mb-6 border-b border-border pb-2">
            Education
        </h2>
        <div className="space-y-4">
             <div className="hover:bg-muted/20 p-3 -mx-3 rounded transition-colors duration-200">
                <div className="flex justify-between items-baseline">
                    <h3 className="text-foreground font-medium">Specialized Master – Automotive Embedded Systems</h3>
                    <span className="font-mono text-xs text-muted-foreground">2019 – 2022</span>
                </div>
                <p className="text-sm text-muted-foreground">ENSIAS, Rabat</p>
             </div>
             <div className="hover:bg-muted/20 p-3 -mx-3 rounded transition-colors duration-200">
                <div className="flex justify-between items-baseline">
                    <h3 className="text-foreground font-medium">Professional Bachelor – Diagnostic and Maintenance of Automotive Electronic Embedded Systems</h3>
                    <span className="font-mono text-xs text-muted-foreground">2018 – 2019</span>
                </div>
                <p className="text-sm text-muted-foreground">EST Salé</p>
             </div>
             <div className="hover:bg-muted/20 p-3 -mx-3 rounded transition-colors duration-200">
                <div className="flex justify-between items-baseline">
                    <h3 className="text-foreground font-medium">Diploma in Technological Studies – Electrical Engineering & Industrial Computing</h3>
                    <span className="font-mono text-xs text-muted-foreground">2016 – 2018</span>
                </div>
                <p className="text-sm text-muted-foreground">EST Salé</p>
             </div>
        </div>
      </section>
      
      {/* Certifications - Simple List */}
      <section className="mb-16 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-700 fill-mode-both">
         <h2 className="text-lg font-bold uppercase tracking-wider text-muted-foreground mb-4 border-b border-border pb-2">
            Certifications
        </h2>
        <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
            <li className="hover:text-primary transition-colors duration-200 cursor-default">DP-900: Microsoft Azure Data Fundamentals (WIP)</li>
            <li className="hover:text-primary transition-colors duration-200 cursor-default">DP-700: Microsoft Fabric Data Engineer (WIP)</li>
            <li className="hover:text-primary transition-colors duration-200 cursor-default">Terraform Expedition: Exploring Infrastructure as Code</li>
        </ul>
      </section>

      {/* Digital Garden / Notes */}
      <section className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-1000 fill-mode-both">
        <h2 className="text-lg font-bold uppercase tracking-wider text-muted-foreground mb-6 border-b border-border pb-2 flex items-center justify-between">
           Digital Garden <span className="text-xs font-normal normal-case opacity-60">Recent Notes</span>
        </h2>
        <div className="p-4 rounded-lg border border-border/50 bg-card/30 hover:bg-card/50 transition-colors">
            <p className="text-sm text-muted-foreground italic">
            "Documentation is a love letter that you write to your future self."
            </p>
            <div className="mt-4 flex gap-2">
            <Link href="/brain" className="text-xs text-primary hover:underline">
                Browse Knowledge Graph &rarr;
            </Link>
            </div>
        </div>
      </section>
    </main>
  );
}
