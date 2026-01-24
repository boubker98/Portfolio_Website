import Link from "next/link";
import { getAllPosts } from "@/lib/markdown";
import { getAllProjects } from "@/lib/projects";
import { RecentNotes } from "@/components/recent-notes";
import { ProjectCard } from "@/components/project-card";

export default async function Home() {
  const posts = await getAllPosts();
  const recentPosts = posts.slice(0, 5);
  
  const projects = getAllProjects();
  // Filter out portfolio project from the grid since we are on the portfolio page
  const featuredProjects = projects.filter(p => p.slug !== 'portfolio').slice(0, 4);

  return (
    <main className="min-h-screen p-8 md:p-12 lg:p-24 max-w-4xl mx-auto">
      {/* Hero Section */}
      <header className="mb-24 space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
            Boubker ENNAJY
          </h1>
          <h2 className="text-2xl md:text-3xl font-mono text-muted-foreground">
            Data Engineer
          </h2>
        </div>
        
        <p className="text-xl leading-relaxed max-w-2xl text-foreground/90">
            Passionate about transforming raw data into reliable insights. I build data systems that balance scalability, quality, and impact.
        </p>
        
        <div className="flex gap-4 text-sm font-mono text-muted-foreground">
          <a href="mailto:boubkerennajy@gmail.com" className="hover:text-primary transition-colors">Email</a>
          <span>/</span>
          <a href="https://linkedin.com/in/b-ennajy" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">LinkedIn</a>
          <span>/</span>
          <a href="https://github.com/boubker98" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">GitHub</a>
        </div>
      </header>

      {/* Experience Section */}
      <section className="mb-24 space-y-12">
        <h2 className="text-2xl font-bold font-mono border-b border-border pb-2 text-foreground">
          Professional Experience
        </h2>
        
        <div className="space-y-10">
          <div className="group">
            <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-2">
              <h3 className="text-xl font-semibold text-foreground">Software Developer</h3>
              <span className="font-mono text-sm text-muted-foreground">Nov 2023 – Oct 2024</span>
            </div>
            <p className="text-lg text-primary mb-4">Boundless Rider</p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground marker:text-primary/50">
              <li>Developed and deployed mobile features in React Native, improving user engagement.</li>
              <li>Built and optimized backend APIs, reducing response time by 20%.</li>
              <li>Provided production support for web applications, ensuring 99% uptime.</li>
            </ul>
          </div>

          <div className="group">
            <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-2">
              <h3 className="text-xl font-semibold text-foreground">Internships</h3>
            </div>
            <div className="space-y-8 border-l border-border pl-6 ml-2">
              <div>
                <div className="flex justify-between items-baseline mb-1">
                   <h4 className="font-medium text-foreground">Safran Electrical & Power</h4>
                   <span className="font-mono text-xs text-muted-foreground">Apr – Oct 2021</span>
                </div>
                <p className="text-sm text-muted-foreground">Built a computer vision and AI system for H160 station, automating load handling.</p>
              </div>
              <div>
                <div className="flex justify-between items-baseline mb-1">
                   <h4 className="font-medium text-foreground">AutoHall</h4>
                   <span className="font-mono text-xs text-muted-foreground">Apr – Jun 2019</span>
                </div>
                 <p className="text-sm text-muted-foreground">Conducted technical study of particle filters and supported vehicle diagnostics.</p>
              </div>
              <div>
                <div className="flex justify-between items-baseline mb-1">
                   <h4 className="font-medium text-foreground">ONCF</h4>
                   <span className="font-mono text-xs text-muted-foreground">Apr – Jun 2018</span>
                </div>
                 <p className="text-sm text-muted-foreground">Designed an alarm system against motor overheating in E-1100 locomotives.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="mb-24 space-y-8">
        <h2 className="text-2xl font-bold font-mono border-b border-border pb-2 text-foreground">
          Technical Skills
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
            {[
                { name: "Languages", items: "Python, SQL, Bash, JavaScript" },
                { name: "Data Engineering", items: "Pandas, Polars, Dask, PySpark, Airflow, dbt" },
                { name: "Databases", items: "PostgreSQL, MySQL, MS SQL Server, DuckDB" },
                { name: "Cloud & DevOps", items: "AWS, Azure, Docker, Terraform, Git" },
                { name: "Data Quality", items: "Pandera, Great Expectations, Pytest" },
                { name: "Visualization", items: "Power BI, DAX, Matplotlib, Seaborn" },
            ].map((category) => (
                <div key={category.name}>
                    <h3 className="text-sm font-mono text-primary mb-2 uppercase tracking-wider">{category.name}</h3>
                    <p className="text-foreground">{category.items}</p>
                </div>
            ))}
        </div>
      </section>

      {/* Featured Projects */}
      {featuredProjects.length > 0 && (
        <section className="mb-24 space-y-8">
          <div className="flex items-center justify-between border-b border-border pb-2">
            <h2 className="text-2xl font-bold font-mono text-foreground">
              Selected Work
            </h2>
            <Link href="/projects" className="text-sm font-mono text-muted-foreground hover:text-primary transition-colors">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </section>
      )}

      {/* Education & Certifications */}
      <section className="mb-24 space-y-8">
        <h2 className="text-2xl font-bold font-mono border-b border-border pb-2 text-foreground">
            Education
        </h2>
        <div className="space-y-6">
             <div>
                <h3 className="text-foreground font-medium">Specialized Master – Automotive Embedded Systems</h3>
                <p className="text-muted-foreground">ENSIAS, Rabat <span className="font-mono text-xs ml-2 text-primary">2019 – 2022</span></p>
             </div>
             <div>
                <h3 className="text-foreground font-medium">Professional Bachelor – Automotive Electronic Systems</h3>
                <p className="text-muted-foreground">EST Salé <span className="font-mono text-xs ml-2 text-primary">2018 – 2019</span></p>
             </div>
             <div>
                <h3 className="text-foreground font-medium">Diploma in Electrical Engineering</h3>
                <p className="text-muted-foreground">EST Salé <span className="font-mono text-xs ml-2 text-primary">2016 – 2018</span></p>
             </div>
        </div>

        <h3 className="text-xl font-bold font-mono pt-8 pb-2 text-foreground">
            Certifications
        </h3>
        <ul className="space-y-2 text-muted-foreground">
            <li>PL-300: Power BI Data Analyst</li>
            <li>AZ-900 / DP-900: Microsoft Azure Fundamentals</li>
            <li>Terraform Expedition: Exploring Infrastructure as Code</li>
        </ul>
      </section>

      <RecentNotes posts={recentPosts} />
    </main>
  );
}
