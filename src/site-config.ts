/**
 * astro-theme-ink · site configuration
 * Everything the theme needs in one typed object — no virtual modules,
 * just import { config } from '@/site-config' where needed.
 */

export interface NavItem {
  title: string
  link: string
}

export interface FriendLink {
  name: string
  desc: string
  url: string
  /** Absolute URL of the avatar image. Optional. */
  avatar?: string
}

export interface EducationItem {
  school: string
  /** e.g. "计算机技术" */
  major?: string
  /** e.g. "硕士" */
  degree?: string
  /** e.g. "August 2021 - July 2024" */
  date: string
}

export interface SkillGroup {
  title: string
  items: string[]
}

export interface HomeHeroConfig {
  /** Tagline chip above the name, e.g. "Developer / Designer / Photographer" */
  tagline?: string
  /** Location label, e.g. "China / QingDao" */
  location?: string
  /** About paragraph under the name */
  about: string
  /** Short homepage introduction; falls back to the first paragraph of about. */
  summary?: string
  /** Action buttons */
  buttons?: { title: string; link: string }[]
}

/** Home page content — edit this file and sections appear/disappear automatically. */
export interface HomeConfig {
  hero: HomeHeroConfig
  /** How many recent posts to show; capped at 5 (0 hides the section). */
  recentPosts: number
  /** Education timeline; renders when non-empty */
  education?: EducationItem[]
  /** Skill groups; renders when non-empty */
  skills?: SkillGroup[]
  /** Show friend links on the home page */
  showFriends: boolean
}

export interface Config {
  /** Site identity */
  site: {
    title: string
    /** Shown on the home page hero and in the footer copyright */
    author: string
    description: string
    lang: string
    favicon: string
    /** Avatar image shown on the home page hero; a path under `public/` */
    avatar: string
    /** Open-graph image path under `public/` */
    ogImage: string
    /** Founding year of the blog — used by the console easter egg */
    since: number
    /** Default color palette for first-time visitors: 'ink' (warm) | 'fresh' (mint) */
    palette: 'ink' | 'fresh'
    /** Default theme for first-time visitors: 'light' | 'dark' | 'system' (follow OS) */
    theme: 'light' | 'dark' | 'system'
    /** e.g. " · " */
    titleDelimiter: string
  }
  header: {
    menu: NavItem[]
  }
  /** Article page views — Waline server URL; leave empty to disable.
   *  Waline 3 counts via POST `/article` (v2 counted on GET); the theme
   *  handles both. The same server also powers the site-wide counter below. */
  pageview: {
    server: string
    /** Site-wide total-visits counter in the footer (shares the same server) */
    siteWide: boolean
  }
  footer: {
    /** Show a quote selected at build time; omitted or false keeps the footer quiet. */
    showQuote?: boolean
    /** Shown as `© <year> <author>`; set a custom string to override entirely */
    copyright?: string
    /** Extra plain-text links rendered next to the copyright */
    links?: { title: string; url: string }[]
    social?: Record<string, { label: string; url: string }>
  }
  blog: {
    pageSize: number
  }
  /** Home page content (config-driven sections) */
  home: HomeConfig
  /** Lightweight client-side search (no external indexer) */
  search: {
    enabled: boolean
  }
  /**
   * Waline comment system. Leave `server` empty to disable.
   * See https://waline.js.org to deploy your own Waline instance.
   */
  comment: {
    provider: 'waline'
    server: string
  }
  friends: FriendLink[]
}

export const config: Config = {
  site: {
    title: 'Weichen Huang',
    author: 'Weichen Huang',
    description:
      'Research on intelligence, representations, and the connections between minds and machines.',
    lang: 'en',
    favicon: '/favicon/favicon.svg',
    avatar: '/avatar.webp',
    ogImage: '/og-card.svg',
    since: 2025,
    palette: 'ink',
    theme: 'system',
    titleDelimiter: ' · '
  },
  header: {
    menu: [
      { title: 'Home', link: '/' },
      { title: 'Bio', link: '/bio' },
      { title: 'Projects', link: '/projects' },
      { title: 'Writing', link: '/writing' },
      { title: 'Reading', link: '/reading' },
      { title: 'Photos', link: '/photos' }
    ]
  },
  pageview: { server: '', siteWide: false },
  footer: {
    showQuote: false,
    links: [
      { title: 'Email', url: 'mailto:wh@gatech.edu' },
      { title: 'RSS', url: '/rss.xml' }
    ],
    social: {
      github: { label: 'GitHub', url: 'https://github.com/weichen-huang' },
      linkedin: { label: 'LinkedIn', url: 'https://www.linkedin.com/in/weichenhuang1/' },
      scholar: {
        label: 'Google Scholar',
        url: 'https://scholar.google.com/citations?user=SSOtC7EAAAAJ'
      }
    }
  },
  blog: { pageSize: 8 },
  home: {
    hero: {
      tagline: 'I like to think, sometimes.',
      location: 'Atlanta, Georgia',
      about:
        'I’m Weichen, a computer science student at Georgia Tech. I study how artificial and biological systems represent the world, with interests in mechanistic interpretability, representation geometry, and computational neuroscience.',
      buttons: [{ title: 'More about me', link: '/bio' }]
    },
    recentPosts: 0,
    education: [
      {
        school: 'Georgia Institute of Technology',
        major: 'Computer Science',
        degree: 'B.S. · Class of 2029',
        date: '2025–present'
      },
      {
        school: 'St Andrew’s College',
        degree: 'International Baccalaureate',
        date: 'Graduated 2025'
      }
    ],
    skills: [
      {
        title: 'Machine learning',
        items: [
          'PyTorch',
          'PyTorch Lightning',
          'Hugging Face',
          'Self-supervised learning',
          'Contrastive learning'
        ]
      },
      {
        title: 'Interpretability',
        items: ['Linear probes', 'Sparse autoencoders', 'RSA', 'Representation geometry']
      },
      {
        title: 'Neuroscience',
        items: ['fMRI encoding models', 'Voxel-wise regression', 'Multimodal alignment']
      }
    ],
    showFriends: false
  },
  search: { enabled: true },
  comment: { provider: 'waline', server: '' },
  friends: []
}
