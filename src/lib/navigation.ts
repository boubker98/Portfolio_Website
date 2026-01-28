import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { getAllPosts } from './markdown';

const contentDirectory = path.join(process.cwd(), 'content');

export interface NavItem {
  label: string;
  href: string;
  type: 'file' | 'directory';
  children?: NavItem[];
}

/**
 * Get all navigation items from a content subdirectory (for projects)
 */
function getNavItemsFromDirectory(dirName: string, basePath: string): NavItem[] {
  const dirPath = path.join(contentDirectory, dirName);
  
  if (!fs.existsSync(dirPath)) {
    return [];
  }

  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  
  return entries
    .filter(entry => entry.isFile() && entry.name.endsWith('.md'))
    .map(entry => {
      const slug = entry.name.replace(/\.md$/, '');
      const fullPath = path.join(dirPath, entry.name);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);

      return {
        label: data.title || slug.replace(/-/g, ' '),
        href: `${basePath}/${slug}`,
        type: 'file' as const,
      };
    });
}

/**
 * Get the full navigation tree for the sidebar (async because brain notes come from GitHub)
 */
export async function getNavigationTree(): Promise<NavItem[]> {
  // Projects - local files
  const projectItems = getNavItemsFromDirectory('projects', '/projects');
  
  // Brain - from getAllPosts (local + GitHub)
  const brainPosts = await getAllPosts();
  const brainItems: NavItem[] = brainPosts.map(post => ({
    label: post.title,
    href: `/brain/${encodeURIComponent(post.slug)}`,
    type: 'file' as const,
  }));

  const navTree: NavItem[] = [
    {
      label: 'Home',
      href: '/',
      type: 'file',
    },
    {
      label: 'Projects',
      href: '/projects',
      type: 'directory',
      children: projectItems,
    },
    {
      label: 'Brain',
      href: '/brain',
      type: 'directory',
      children: brainItems.length > 0 ? brainItems : undefined,
    },
  ];

  return navTree;
}
