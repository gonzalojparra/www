export interface AvatarProps {
  name: string
  initials: string
}

export interface AboutProps {
  title: string
  description: string
}

export interface LinksProps {
  title: string
  url: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
}

export interface CareerProps {
  company: string
  link?: string
  badges: string
  title: string
  start: string
  end: string
  description: string
  viewMore?: string
}

export interface TagsProps {
  name: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
}

export interface StackProps {
  name: string,
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
}

export interface ProjectLinkProps {
  github?: string
  preview?: string
}

type ProjectTitle = 'Jotter' | 'Ehwaz' | 'Zen-Kicks'

export interface ProjectProps {
  title: ProjectTitle
  tags: TagsProps[]
  description: string
  link: ProjectLinkProps
  image?: string
  video?: string
}

export interface ContactEmailTemplateProps {
  firstName: string
  lastName: string
  email: string
  message: string
}