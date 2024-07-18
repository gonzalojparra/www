import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, GithubIcon, LinkIcon } from 'lucide-react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ProjectProps } from '@/types/components';

export function ProjectItem({ title, description, tags, image, video, link }: ProjectProps) {
  return (
    <Card
      key={title}
      className='flex w-full flex-col border shadow transition-all duration-300 ease-out hover:shadow-lg md:flex-row'
    >
      <div className='flex w-full flex-row px-1 pt-1 md:py-1 md:pl-1 md:pr-0'>
        {image ? (
          <Image
            alt={title}
            className='aspect-auto w-full rounded-md object-fill shadow'
            height={1080}
            loading='lazy'
            src={image}
            width={1920}
          />
        ) : null}
        {video ? (
          <video
            autoPlay
            loop
            muted
            className='w-full rounded-md object-fill shadow'
            height={1080}
            width={1920}
          >
            <source src={video} type='video/webm' />
          </video>
        ) : null}
      </div>

      <div className='flex w-full flex-col'>
        <CardHeader className='flex p-4'>
          <div className='space-y-2'>
            <CardTitle className='text-xl'>
              {link ? (
                <Link
                  className='group inline-flex items-center underline-offset-4 hover:underline'
                  href={link.github ? link.github : ''}
                  rel='noopener noreferrer'
                  target='_blank'
                >
                  <h3>{title}</h3>
                  <ArrowUpRight className='ml-2 h-4 w-4 duration-300 group-hover:translate-x-0 group-hover:opacity-100 md:-translate-x-full md:opacity-0' />
                </Link>
              ) : (
                <h3>{title}</h3>
              )}
            </CardTitle>

            <CardDescription className='font-mono text-sm'>{description}</CardDescription>
          </div>
        </CardHeader>

        <CardContent className='flex flex-col gap-y-4 px-4 pb-4'>
          <div className='flex flex-wrap gap-2'>
            {tags.map((tag) => (
              <Badge key={tag.name} className='gap-1 rounded-md p-1 shadow' variant='secondary'>
                <tag.icon className='size-4' />
                <p className='text-xs'>{tag.name}</p>
              </Badge>
            ))}
          </div>

          <div className='flex gap-x-2'>
            {link.github ? (
              <Button className='px-3 shadow' size='default' variant='default'>
                <Link
                  className='flex items-center gap-1'
                  href={link.github}
                  rel='noopener noreferrer'
                  target='_blank'
                >
                  <GithubIcon className='mr-1 size-4' />
                  <p>Code</p>
                </Link>
              </Button>
            ) : null}
            {link.preview ? (
              <Button className='px-3 shadow' size='default' variant='default'>
                <Link
                  className='flex items-center gap-1'
                  href={link.preview}
                  rel='noopener noreferrer'
                  target='_blank'
                >
                  <LinkIcon className='mr-1 size-4' />
                  <p>Preview</p>
                </Link>
              </Button>
            ) : null}
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
