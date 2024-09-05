import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/api',
    },
    sitemap: 'https://gonzalojparra.vercel.app/sitemap.xml',
    host: 'https://gonzalojparra.vercel.app',
  };
}
