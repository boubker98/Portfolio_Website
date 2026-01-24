import { getPostBySlug, getAllPosts } from "@/lib/markdown";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import Link from "next/link";
import { format } from "date-fns";
import { ArrowLeft } from "lucide-react";
import remarkGfm from "remark-gfm";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function NotePage({ params }: PageProps) {
  const resolvedParams = await params;
  const post = await getPostBySlug(resolvedParams.slug);

  if (!post) notFound();

  return (
    <article className="min-h-screen max-w-3xl mx-auto p-8">
      <div className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/brain" className="hover:text-foreground hover:underline transition-colors">
          Brain
        </Link>
        <span>/</span>
        <span className="font-medium text-foreground truncate">{post.title}</span>
      </div>

      <header className="mb-10">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <time dateTime={post.date}>
            {format(new Date(post.date), "MMMM d, yyyy")}
          </time>
          {post.tags && post.tags.length > 0 && (
            <div className="flex gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-secondary rounded-md text-xs font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </header>

      <div className="prose dark:prose-invert max-w-none prose-headings:font-semibold prose-a:text-blue-500 hover:prose-a:text-blue-600 transition-colors prose-table:w-full">
        <MDXRemote 
          source={post.content.replace(/\[\[(.*?)\]\]/g, (match, slug) => {
              const title = slug.split('|')[0]; // simple handling for now
              return `[${title}](/brain/${encodeURIComponent(title)})`;
          })} 
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
            },
          }}
        />
      </div>

      {post.backlinks && post.backlinks.length > 0 && (
        <section className="mt-16 pt-8 border-t border-border">
          <h2 className="text-xl font-bold mb-4">Linked to this note</h2>
          <ul className="space-y-2">
            {post.backlinks.map((backlink) => (
              <li key={backlink.slug}>
                <Link 
                  href={`/brain/${backlink.slug}`}
                  className="text-blue-500 hover:text-blue-600 hover:underline transition-colors"
                >
                  {backlink.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}
