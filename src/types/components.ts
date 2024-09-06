export interface AvatarProps {
  name: string;
  initials: string;
}

export interface AboutProps {
  title: string;
  description: string;
}

export interface LinksProps {
  title: string;
  url: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

export interface CareerProps {
  company: string;
  link?: string;
  badges: string;
  title: string;
  start: string;
  end: string;
  description: string;
  viewMore?: string;
}

export interface TagsProps {
  name: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

export interface ContactEmailTemplateProps {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
}
