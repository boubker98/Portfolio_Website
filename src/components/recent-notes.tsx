import Link from "next/link";
import { Post } from "@/lib/markdown";
import { format } from "date-fns";
import { ArrowRight } from "lucide-react";
import { Tag } from "@/components/ui/tag";

interface RecentNotesProps {
  posts: Post[];
}

export function RecentNotes({ posts }: RecentNotesProps) {
  return (
    <section className="space-y-6">
      <div className="grid gap-3">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/brain/${post.slug}`}
            className="group block p-4 border border-border/50 rounded-lg hover:border-primary/30 hover:bg-muted/10 transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                {post.title}
              </h3>
              <time dateTime={post.date} className="text-xs font-mono text-muted-foreground group-hover:text-primary/70">
                {format(new Date(post.date), "MMM d, yyyy")}
              </time>
            </div>
            {post.excerpt && (
              <p className="text-muted-foreground text-sm mb-3 line-clamp-2 opacity-80 group-hover:opacity-100 transition-opacity">
                {post.excerpt}
              </p>
            )}
            <div className="flex items-center gap-3 text-xs text-muted-foreground font-mono">
                  <div className="flex gap-2">
                    {post.tags?.slice(0, 3).map(tag => (
                       <span key={tag} className="text-[10px] text-muted-foreground border border-border/50 px-1.5 py-0.5 rounded opacity-70 group-hover:opacity-100 transition-opacity">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <ArrowRight className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0 text-primary" />
            </div>
          </Link>
        ))}
      </div>
      <div className="flex justify-end">
        <Link 
          href="/brain" 
          className="text-sm font-mono text-muted-foreground hover:text-primary inline-flex items-center gap-2 group transition-colors"
        >
          Explore the Vault <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
}
