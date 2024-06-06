import { useTranslations } from 'next-intl';

import { ProjectItem } from '@/components/projects/project-item';
import { CodeIcon } from 'lucide-react';

import { data } from '@/constants';

export function Projects() {
  let { projects } = data;
  const t = useTranslations();
  const projectItems = useTranslations('projects-section.projects');

  return (
    <>
      <h2 className='flex gap-x-4 items-center text-3xl font-bold text-balance'>
        <CodeIcon className='size-6' />
        {t('projects-section.title')}
      </h2>

      <div className='flex flex-col gap-y-4'>
        {projects.map(({ title, tags, image, video, link }) =>
          <ProjectItem
            key={title}
            title={title}
            description={projectItems(`${title}.description`)}
            tags={tags}
            image={image}
            video={video}
            link={link}
          />
        )}
      </div>
    </>
  );
}