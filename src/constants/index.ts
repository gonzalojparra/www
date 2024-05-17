import { AVATAR, ABOUT, LINKS, CAREER, PROJECTS } from '@/data';
import type {
  AvatarProps,
  AboutProps,
  LinksProps,
  CareerProps,
  ProjectProps
} from '@/types';

export const data = {
  avatar: AVATAR as AvatarProps,
  about: ABOUT as AboutProps,
  links: LINKS as unknown as LinksProps,
  career: CAREER as unknown as CareerProps,
  projects: PROJECTS as ProjectProps[]
};