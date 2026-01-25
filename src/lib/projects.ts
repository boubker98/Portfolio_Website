import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { preprocessMarkdown } from './markdown';

const projectsDirectory = path.join(process.cwd(), 'content/projects');

export type Project = {
  slug: string;
  title: string;
  date: string;
  description: string;
  image?: string;
  demoUrl?: string;
  repoUrl?: string;
  tags?: string[];
  content: string;
};

export function getAllProjects(): Project[] {
  if (!fs.existsSync(projectsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(projectsDirectory);
  const allProjectsData = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(projectsDirectory, fileName);
      let fileContents = fs.readFileSync(fullPath, 'utf8');
      
      // Fix MDX compliance
      fileContents = preprocessMarkdown(fileContents);

      const { data, content } = matter(fileContents);

      return {
        slug,
        title: data.title || slug,
        date: data.date || new Date().toISOString(),
        description: data.description || '',
        image: data.image,
        demoUrl: data.demoUrl,
        repoUrl: data.repoUrl,
        tags: data.tags || [],
        content,
      };
    });

  return allProjectsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getProjectBySlug(slug: string): Project | null {
  const realSlug = decodeURIComponent(slug);
  const fullPath = path.join(projectsDirectory, `${realSlug}.md`);
  if (!fs.existsSync(fullPath)) return null;

  let fileContents = fs.readFileSync(fullPath, 'utf8');
  
  // Fix MDX compliance
  fileContents = preprocessMarkdown(fileContents);
  
  const { data, content } = matter(fileContents);

  return {
    slug,
    title: data.title || realSlug,
    date: data.date || new Date().toISOString(),
    description: data.description || '',
    image: data.image,
    demoUrl: data.demoUrl,
    repoUrl: data.repoUrl,
    tags: data.tags || [],
    content,
  };
}
