import { useTranslations } from 'next-intl';
import { CodeIcon } from 'lucide-react';

import { ProjectItem } from '@/components/projects/project-item';
import { data } from '@/constants';

export function Projects() {
  const { projects } = data;
  const t = useTranslations();
  const projectItems = useTranslations('projects-section.projects');

  return (
    <>
      <h2 className='flex items-center gap-x-4 text-balance text-3xl font-bold'>
        <CodeIcon className='size-6' />
        {t('projects-section.title')}
      </h2>

      <div className='flex flex-col gap-y-4'>
        {projects.map(({ title, tags, image, video, link }) => (
          <ProjectItem
            key={title}
            description={projectItems(`${title}.description`)}
            image={image}
            link={link}
            tags={tags}
            title={title}
            video={video}
          />
        ))}
      </div>
    </>
  );
}
