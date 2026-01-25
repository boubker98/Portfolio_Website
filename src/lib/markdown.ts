import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const notesDirectory = path.join(process.cwd(), 'content/notes');

export type Post = {
  slug: string;
  title: string;
  date: string;
  excerpt?: string;
  tags?: string[];
  content: string;
  backlinks?: { slug: string; title: string }[];
};

// Helper: Preprocess markdown to ensure MDX compliance
export function preprocessMarkdown(content: string): string {
  // Fix MDX compliance: Ensure <img> tags are self-closing
  // Matches <img ... > and converts to <img ... />
  return content.replace(
    /<img([^>]+?)(?<!\/)>/gi, 
    (match, attributes) => `<img${attributes} />`
  );
}

// Helper: Fetch remote posts from GitHub
async function fetchRemotePosts(): Promise<Post[]> {
  const token = process.env.GITHUB_TOKEN;
  const owner = "boubker98";
  const repo = "Bootcamp-notes";
  
  if (!token) {
    console.warn("GITHUB_TOKEN is not set. Skipping remote notes fetch.");
    return [];
  }

  // Debugging 404
  console.log(`[DEBUG] Attempting to fetch remote notes...`);
  console.log(`[DEBUG] Repo: ${owner}/${repo}`);
  console.log(`[DEBUG] Token Status: ${token ? 'Present' : 'Missing'} (Length: ${token.length})`);

  try {
    // 1. Get default branch (resolves main vs master issue)
    const repoUrl = `https://api.github.com/repos/${owner}/${repo}`;
    console.log(`[DEBUG] Fetching Repo Info: ${repoUrl}`);
    
    const repoRes = await fetch(repoUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github.v3+json',
      },
      next: { revalidate: 3600 }
    });

    if (!repoRes.ok) {
      console.error(`Failed to fetch repo info: ${repoRes.status} ${repoRes.statusText}`);
      // If 404 here, it's definitely a Token or Repo Name issue
      return [];
    }

    const repoData = await repoRes.json();
    const branch = repoData.default_branch || 'main';

    // 2. Fetch the git tree recursively using the correct branch
    const treeUrl = `https://api.github.com/repos/${owner}/${repo}/git/trees/${branch}?recursive=1`;
    const treeRes = await fetch(treeUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github.v3+json',
      },
      next: { revalidate: 3600 } 
    });

    if (!treeRes.ok) {
      console.error(`Failed to fetch GitHub tree: ${treeRes.statusText}`);
      return [];
    }

    const treeData = await treeRes.json();
    const mdFiles = treeData.tree.filter((node: any) => node.path.endsWith('.md'));

    // 3. Fetch content for each file (in parallel)
    const postsPromises = mdFiles.map(async (file: any) => {
      const rawUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${file.path}`;
      const contentRes = await fetch(rawUrl, {
         headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/vnd.github.v3.raw', // Request raw content directly
         }
      });
      
      if (!contentRes.ok) return null;

      let fileContents = await contentRes.text();
      fileContents = preprocessMarkdown(fileContents);

      const { data, content } = matter(fileContents);
      
      // Use filename as slug, handling folders (e.g. Day1/note.md -> note)
      // Or preserve path structure? User said "folders relate to each day".
      // Let's use the basename for the slug to keep URLs clean, unless collisions occur.
      const slug = path.basename(file.path, '.md');

      return {
        slug,
        title: data.title || slug,
        date: data.date || new Date().toISOString(),
        excerpt: data.excerpt || '',
        tags: data.tags || [],
        content,
      };
    });

    const posts = await Promise.all(postsPromises);
    return posts.filter((p): p is Post => p !== null);

  } catch (error) {
    console.error("Error fetching remote notes:", error);
    return [];
  }
}

// Helper: Fetch local posts
function getLocalPosts(): Post[] {
    if (!fs.existsSync(notesDirectory)) {
        return [];
    }
    const fileNames = fs.readdirSync(notesDirectory);
    return fileNames
        .filter((fileName) => fileName.endsWith('.md'))
        .map((fileName) => {
            const slug = fileName.replace(/\.md$/, '');
            const fullPath = path.join(notesDirectory, fileName);
            let fileContents = fs.readFileSync(fullPath, 'utf8');
            
            // Fix MDX compliance for local posts too
            fileContents = preprocessMarkdown(fileContents);
            
            const { data, content } = matter(fileContents);
            return {
                slug,
                title: data.title || slug,
                date: data.date || new Date().toISOString(),
                excerpt: data.excerpt || '',
                tags: data.tags || [],
                content,
            };
        });
}

// Main function to get all posts (merged)
export async function getAllPosts(): Promise<Post[]> {
  const localPosts = getLocalPosts();
  const remotePosts = await fetchRemotePosts();
  
  // Merge, preferring local if slug collision (or remote? let's simply concat for now)
  // Actually, let's unique by slug
  const allPosts = [...localPosts, ...remotePosts];
  const uniquePosts = Array.from(new Map(allPosts.map(p => [p.slug, p])).values());

  return uniquePosts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const allPosts = await getAllPosts();
  const realSlug = decodeURIComponent(slug);
  
  const post = allPosts.find(p => p.slug === realSlug);
  if (!post) return null;

  // Calculate backlinks
  const backlinks = allPosts
    .filter(p => {
      const encodedSlug = encodeURIComponent(realSlug);
      const markdownLinkRegex = new RegExp(`\\[.*?\\]\\(/brain/(${realSlug.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}|${encodedSlug.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})(?:#.*)?\\)`, 'g');
      const wikiLinkRegex = new RegExp(`\\[\\[(${realSlug.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}|${encodedSlug.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})(?:\\|.*?)?\\]\\]`, 'g');
      return markdownLinkRegex.test(p.content) || wikiLinkRegex.test(p.content);
    })
    .map(p => ({
      slug: p.slug,
      title: p.title
    }));

  return {
    ...post,
    backlinks
  };
}

export type GraphNode = {
  id: string;
  name: string;
  val: number;
};

export type GraphLink = {
  source: string;
  target: string;
};

export type GraphData = {
  nodes: GraphNode[];
  links: GraphLink[];
};

export async function getGraphData(): Promise<GraphData> {
  const posts = await getAllPosts();
  const nodes: GraphNode[] = posts.map(post => ({
    id: post.slug,
    name: post.title,
    val: 1
  }));

  const links: GraphLink[] = [];

  posts.forEach(post => {
    // Regex for markdown links [text](/brain/slug)
    const markdownLinkRegex = /\[.*?\]\(\/brain\/([^\)]+)\)/g;
    let match;
    
    while ((match = markdownLinkRegex.exec(post.content)) !== null) {
      const targetSlug = decodeURIComponent(match[1]);
      if (nodes.some(n => n.id === targetSlug)) {
        links.push({
          source: post.slug,
          target: targetSlug
        });
      }
    }

    // Check for Wikilinks [[slug]]
    const wikiLinkRegex = /\[\[(.*?)\]\]/g;
    while ((match = wikiLinkRegex.exec(post.content)) !== null) {
      const parts = match[1].split('|');
      const targetSlug = parts[0].trim();
      const foundNode = nodes.find(n => n.name === targetSlug || n.id === targetSlug);
      
      if (foundNode) {
        links.push({
          source: post.slug,
          target: foundNode.id
        });
      }
    }
  });

  return { nodes, links };
}
