import Link from "next/link";
import { getAllPosts, getGraphData } from "@/lib/markdown";
import { format } from "date-fns";
import Graph from "@/components/Graph";

export default async function BrainPage() {
  const posts = await getAllPosts();
  const graphData = await getGraphData();

  // Group posts by their primary tag, fallback to "Uncategorized"
  const groupedPosts = posts.reduce((acc, post) => {
    const minTags = post.tags && post.tags.length > 0 ? post.tags : ["Uncategorized"];
    minTags.forEach(tag => {
        if (!acc[tag]) acc[tag] = [];
        // Avoid duplicates if a post has multiple tags, we present it in multiple sections
        if (!acc[tag].find(p => p.slug === post.slug)) {
            acc[tag].push(post);
        }
    });
    return acc;
  }, {} as Record<string, typeof posts>);

  // Sort tags alphabetically
  const sortedTags = Object.keys(groupedPosts).sort();

  return (
    <main className="min-h-screen p-8 md:p-12 lg:p-24 max-w-4xl mx-auto">
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-mono tracking-tight mb-4">
          The Brain
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed mb-8">
          A collection of interconnected notes, constantly evolving.
        </p>

        <div className="h-[400px] border border-border rounded-xl has-glow overflow-hidden bg-card relative shadow-sm">
           <Graph data={graphData} />
           <div className="absolute inset-0 pointer-events-none rounded-xl ring-1 ring-inset ring-foreground/10" />
        </div>
      </header>
      
      <div className="space-y-16">
        {sortedTags.map((tag) => (
          <section key={tag} className="space-y-6">
            <h2 className="text-xl font-bold font-mono border-b border-border pb-2 text-foreground/80">
              #{tag}
            </h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {groupedPosts[tag].map((post) => (
                <li key={post.slug} className="group">
                  <Link 
                    href={`/brain/${post.slug}`}
                    className="block p-4 rounded-lg bg-card border border-border/50 hover:border-foreground/20 transition-all hover:bg-muted/30"
                  >
                    <h3 className="font-medium text-foreground group-hover:underline decoration-1 underline-offset-4 mb-2">
                       {post.title}
                    </h3>
                    {post.excerpt && (
                       <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                         {post.excerpt}
                       </p>
                    )}
                    <time className="text-xs text-muted-foreground font-mono block">
                      {format(new Date(post.date), "MMM d, yyyy")}
                    </time>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </main>
  );
}
