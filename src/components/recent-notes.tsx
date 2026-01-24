import Link from "next/link";
import { Post } from "@/lib/markdown";
import { format } from "date-fns";
import { ArrowRight } from "lucide-react";

interface RecentNotesProps {
  posts: Post[];
}

export function RecentNotes({ posts }: RecentNotesProps) {
  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold font-mono border-b border-border pb-2">
        Recent Nodes
      </h2>
      <div className="grid gap-4">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/brain/${post.slug}`}
            className="group block p-4 border border-border rounded-lg hover:border-foreground transition-colors bg-card"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold group-hover:underline decoration-1 underline-offset-4">
                {post.title}
              </h3>
              <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity transform -translate-x-2 group-hover:translate-x-0" />
            </div>
            {post.excerpt && (
              <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                {post.excerpt}
              </p>
            )}
            <div className="flex items-center gap-3 text-xs text-muted-foreground font-mono">
              <time dateTime={post.date}>
                {format(new Date(post.date), "MMM d, yyyy")}
              </time>
              {post.tags && post.tags.length > 0 && (
                <>
                  <span>•</span>
                  <div className="flex gap-2">
                    {post.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="bg-secondary px-1.5 py-0.5 rounded text-secondary-foreground">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </>
              )}
            </div>
          </Link>
        ))}
      </div>
      <div className="flex justify-end">
        <Link 
          href="/brain" 
          className="text-sm font-mono text-muted-foreground hover:text-foreground inline-flex items-center gap-2 group"
        >
          Explore the Vault <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
}
