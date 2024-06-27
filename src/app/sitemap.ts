import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  let routes = [
    '/',
    '/#about',
    '/#sobre-mi',
    '/#tech-stack',
    '/#stack-tecnologias',
    '/#career',
    '/#carrera',
    '/#projects',
    '/#proyectos',
    '/#contact',
    '/#contacto',
  ].map((route) => ({
    url: `https://portfolio-gonzalojparra.vercel.app${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }));

  return [...routes];
}
