import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CodeIcon, LinkIcon, GithubIcon } from 'lucide-react';

import { data } from '@/constants';
import Link from 'next/link';

export function Projects() {
  const { projects } = data;

  return (
    <>
      <h2 className='flex gap-x-4 items-center text-3xl font-bold text-balance'>
        <CodeIcon className='size-6' />
        Projects
      </h2>

      <div className='flex flex-col gap-y-4'>
        {projects.map(({ title, description, tags ,image, video, link }) => (
          <Card
            key={title}
            className='flex flex-col md:flex-row border shadow w-full'
          >
            <div className='flex flex-row w-full md:py-1 md:pl-1 md:pr-0 pt-1 px-1'>
              {image && (
                <Image
                  width={1920}
                  height={1080}
                  src={image}
                  alt={title}
                  loading='lazy'
                  className='rounded-md object-fill shadow w-full'
                />
              )}
              {video && (
                <video
                  width={1920}
                  height={1080}
                  controls
                  muted
                  autoPlay
                  loop
                  className='rounded-md object-fill shadow w-full'
                >
                  <source src={video} type='video/webm' />
                </video>
              )}
            </div>

            <div className='flex flex-col w-full'>
              <CardHeader className='flex p-4'>
                <div className='space-y-2'>
                  <CardTitle className='text-xl'>
                    {link ? (
                      <Link
                        href={link.github ? link.github : ''}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='inline-flex items-center hover:underline underline-offset-4'
                      >
                        <h3>{title}</h3>
                      </Link>
                    ) : (
                      <h3>{title}</h3>
                    )}
                  </CardTitle>

                  <CardDescription className='font-mono text-sm'>
                    {description}
                  </CardDescription>
                </div>
              </CardHeader>

              <CardContent className='flex flex-col gap-y-4 px-4 pb-4'>
                <div className='flex flex-wrap gap-2'>
                  {tags.map((tag) => (
                    <Badge
                      key={tag.name}
                      variant='secondary'
                      className='p-1 gap-1 rounded-md shadow'
                    >
                      <tag.icon className='size-4' />
                      <p className='text-xs'>{tag.name}</p>
                    </Badge>
                  ))}
                </div>

                <div className='flex gap-x-2'>
                  {link.github && (
                    <Button
                      variant='default'
                      size='default'
                      className='px-2 shadow hover:scale-105 transition-transform duration-300 ease-in-out'
                    >
                      <Link
                        href={link.github}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='flex items-center gap-1'
                      >
                        <GithubIcon className='size-4' />
                        <p>GitHub</p>
                      </Link>
                    </Button>
                  )}
                  {link.preview && (
                    <Button
                      variant='default'
                      size='default'
                      className='px-2 shadow hover:scale-105 transition-transform duration-300 ease-in-out'
                    >
                      <Link
                        href={link.preview}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='flex items-center gap-1'
                      >
                        <LinkIcon className='size-4' />
                        <p>Preview</p>
                      </Link>
                    </Button>
                  )}
                </div>
              </CardContent>
            </div>
          </Card>
        ))}
      </div>
    </>
  )
}