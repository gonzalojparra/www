import { NextJSIcon } from '@/components/icons/tags/nextjs';
import { ReactIcon } from '@/components/icons/tags/react';
import { LaravelIcon } from '@/components/icons/tags/laravel';
import { TypeScriptIcon } from '@/components/icons/tags/typescript';
import { JavaScriptIcon } from '@/components/icons/tags/javascript';
import { PHPIcon } from '@/components/icons/tags/php';
import { HTMLIcon } from '@/components/icons/tags/html';
import { CSSIcon } from '@/components/icons/tags/css';
import { ViteIcon } from '@/components/icons/tags/vite';
import { ShadcnIcon } from '@/components/icons/tags/shadcn-ui';
import { TailwindCSSIcon } from '@/components/icons/tags/tailwind-css';
import { NodeJSIcon } from '@/components/icons/tags/nodejs';
import { GitHubIcon } from '@/components/icons/github';
import { LinkedInIcon } from '@/components/icons/linkedin';
import { MailIcon } from 'lucide-react';

export const AVATAR = {
  name: 'Gonzalo Parra',
  initials: 'GP'
};

export const ABOUT = {
  title: `Front end Developer, Committed to creating innovative and user-centered solutions.
  Based in Neuquén, Argentina 🇦🇷`,
  description: `Passionate about web technologies. I aim to create accessible, performant, and delightful experiences for users. I'm always looking to learn new things and improve my skills.`
};

export const LINKS = [
  { title: 'GitHub', url: 'https://github.com/gonzalojparra', icon: GitHubIcon },
  { title: 'LinkedIn', url: 'https://www.linkedin.com/in/gonzalojparra/', icon: LinkedInIcon },
  { title: 'Email', url: 'mailto:gonzzaparra@gmail.com', icon: MailIcon }
];

export const CAREER = [
  {
    company: 'Runas Software',
    link: '',
    badges: ['Intern'],
    title: 'Software Developer',
    start: 'August 2023',
    end: 'Present',
    description:
      "I'm currently working at Runas Software as a side project. I work on the front end, using technologies like React, Next.js, and TypeScript. I also work on the back end, using technologies like Laravel and Node.js."
  },
  {
    company: 'National University of Comahue',
    link: 'https://www.uncoma.edu.ar/',
    badges: ['Student'],
    title: 'Full Stack Developer',
    start: 'July 2021',
    end: 'December 2023',
    description:
      "While studying for my bachelor's in software and web development, I developed and maintained web applications for my university career. I worked on the front and back end, using technologies like React, Laravel, and MySQL."
  },
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
  LARAVEL: {
    name: 'Laravel',
    icon: LaravelIcon
  },
  TYPESCRIPT: {
    name: 'TypeScript',
    icon: TypeScriptIcon
  },
  JAVASCRIPT: {
    name: 'JavaScript',
    icon: JavaScriptIcon
  },
  PHP: {
    name: 'PHP',
    icon: PHPIcon
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

export const PROJECTS = [
  {
    title: 'Jotter',
    tags: [
      TAGS.REACT,
      TAGS.NEXT,
      TAGS.NODE,
      TAGS.TYPESCRIPT,
      TAGS.TAILWIND,
      TAGS.SHADCN,
    ],
    description: 'A full-stack note-taking app that allows users to create, edit, and delete notes. It also allows users to categorize notes into notebooks and search for notes.',
    link: {
      github: 'https://github.com/gonzalojparra/jotter',
      preview: 'https://jotter-gonzalojparra.vercel.app/'
    },
    image: '/assets/projects/jotter.png',
  },
  {
    title: 'Ehwaz',
    tags: [
      TAGS.REACT,
      TAGS.NEXT,
      TAGS.LARAVEL,
      TAGS.JAVASCRIPT,
      TAGS.PHP,
      TAGS.TAILWIND,
      TAGS.SHADCN,
    ],
    description: 'A full-stack personal trainers system that allows trainers to manage their clients, workouts, and nutrition plans. It also allows clients to track their progress and communicate with their trainers.',
    link: {
      github: 'https://github.com/gonzalojparra/ehwaz-front'
    },
    image: '/assets/projects/ehwaz.png',
  },
  {
    title: 'Zen-Kicks',
    tags: [
      TAGS.LARAVEL,
      TAGS.PHP,
      TAGS.TAILWIND
    ],
    description: 'A full-stack taekwondo tournaments administrator system. It allows administrators to manage tournaments, categories, competitors and judges. It also allows competitors to register for tournaments.',
    link: {
      github: 'https://github.com/gonzalojparra/zen-kicks'
    },
    image: '/assets/projects/zen-kicks.png',
  }
];