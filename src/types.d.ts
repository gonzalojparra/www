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

export type ActivityData = {
  kv: Record<string, unknown>,
  spotify: {
    track_id: string,
    timestamps: {
      start: number,
      end: number
    },
    album: string,
    album_art_url: string,
    artist: string,
    song: string
  },
  discord_user: {
    id: string,
    username: string,
    avatar: string,
    discriminator: string,
    bot: boolean,
    clan: null | string,
    global_name: string,
    avatar_decoration_data: null | string,
    display_name: string,
    public_flags: number
  },
  activities: [
    {
      flags: number,
      id: string,
      name: string,
      type: number,
      state: string,
      session_id: string,
      details: string,
      timestamps: {
        start: number,
        end: number
      },
      assets: {
        large_image: string,
        large_text: string,
      },
      sync_id: string,
      created_at: number,
      party: {
        id: string
      }
    }
  ],
  discord_status: string,
  active_on_discord_web: boolean,
  active_on_discord_desktop: boolean,
  active_on_discord_mobile: boolean,
  listening_to_spotify: boolean
};

export type ActivityResponse = {
  data: ActivityData,
  success?: boolean
};

export interface Duration {
  minutes: number;
  seconds: number;
  durationMs: number;
};