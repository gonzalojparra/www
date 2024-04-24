import { NextJSIcon } from '@/components/icons/tags/nextjs';
import { ReactIcon } from '@/components/icons/tags/react';
import { TypeScriptIcon } from '@/components/icons/tags/typescript';
import { JavaScriptIcon } from '@/components/icons/tags/javascript';
import { HTMLIcon } from '@/components/icons/tags/html';
import { CSSIcon } from '@/components/icons/tags/css';
import { ViteIcon } from '@/components/icons/tags/vite';
import { ShadcnIcon } from '@/components/icons/tags/shadcn-ui';
import { TailwindCSSIcon } from '@/components/icons/tags/tailwind-css';
import { NodeJSIcon } from '@/components/icons/tags/nodejs';
import { GitHubIcon } from '@/components/icons/github';
import { LinkedInIcon } from '@/components/icons/linkedin';
import { InstagramIcon, MailIcon } from 'lucide-react';

export const AVATAR = {
  name: 'Gonzalo Parra',
  initials: 'GP'
};

export const ABOUT = {
  title: `Frontend Developer, Committed to creating innovative and user-centered solutions.
  Based in Neuquén, Argentina 🇦🇷`,
  description: `Passionate about web technologies. I enjoy creating accessible, performant, and delightful experiences for users. I'm always looking to learn new things and improve my skills.`
};

export const LINKS = [
  { title: 'GitHub', url: 'https://github.com/gonzalojparra', icon: GitHubIcon },
  { title: 'LinkedIn', url: 'https://www.linkedin.com/in/gonzalojparra/', icon: LinkedInIcon },
  { title: 'Instagram', url: 'https://www.instagram.com/gonzaparra_/', icon: InstagramIcon },
  { title: 'Email', url: 'mailto:gonzzaparra@gmail.com', icon: MailIcon }
];

export const CAREER = [
  {
    company: 'National University of Comahue',
    link: 'https://www.uncoma.edu.ar/',
    badges: ['Student'],
    title: 'Software Developer',
    start: 'July 2021',
    end: 'December 2023',
    description:
      'Developed and maintained web applications for my university career. Worked on the frontend and backend, using technologies like React, Laravel, and MySQL.'
  },
];

export const PROJECTS = [
  {
    title: 'A project',
    tags: [

    ],
    description: 'A project description',
    link: 'https://google.com',
    image: 'https://via.placeholder.com/150',
  }
];

const TAGS = {
  NEXT: {
    name: 'Next.js',
    icon: NextJSIcon
  },
  REACT: {
    name: 'React',
    icon: ReactIcon
  },
  TYPESCRIPT: {
    name: 'TypeScript',
    icon: TypeScriptIcon
  },
  JAVASCRIPT: {
    name: 'JavaScript',
    icon: JavaScriptIcon
  },
  HTML: {
    name: 'HTML',
    icon: HTMLIcon
  },
  CSS: {
    name: 'CSS',
    icon: CSSIcon
  },
  VITE: {
    name: 'Vite',
    icon: ViteIcon
  },
  TAILWIND: {
    name: 'Tailwind CSS',
    icon: TailwindCSSIcon
  },
  SHADCN: {
    name: 'Shadcn/ui',
    icon: ShadcnIcon
  },
  NODE: {
    name: 'Node.js',
    icon: NodeJSIcon
  },
};