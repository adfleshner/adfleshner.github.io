import profilePhoto from '@/assets/profile.jpg'
import portraitBwPhoto from '@/assets/photos/aaron-portrait-bw.jpg'
import { experiences } from './experience'

/** Year the first job started, read from the experience data (currently 2012). */
export const careerStartYear = Math.min(
  ...experiences.map((e) => Number(e.period.match(/\d{4}/)?.[0] ?? new Date().getFullYear()))
)

/** Years of professional experience: current year minus the start year, so it stays right every January. */
export const yearsExperience = new Date().getFullYear() - careerStartYear

export interface SocialLink {
  label: string
  url: string
}

export interface StatItem {
  value: string
  label: string
}

export interface Profile {
  name: string
  firstName: string
  initials: string
  avatarUrl: string
  avatarBw?: string
  role: string
  roleFocus: string
  headline: string
  subheadline: string
  location: string
  email: string
  resumeUrl: string
  availableForWork: boolean
  availabilityText: string
  aboutParagraphs: string[]
  stats: StatItem[]
  socials: SocialLink[]
  /** Tip links, shown quietly on Contact and in the footer. First one is the primary. */
  support: SocialLink[]
}

export const profile: Profile = {
  name: 'Aaron Fleshner',
  firstName: 'Aaron',
  initials: 'AF',
  avatarUrl: profilePhoto,
  avatarBw: portraitBwPhoto,
  role: 'Lead Software Engineer',
  roleFocus: 'Android Focus',
  headline: 'I build thoughtful, reliable Android apps.',
  subheadline: 'Lead Software Engineer (Android Focus).',
  location: 'NC, USA',
  email: 'adfleshner@gmail.com',
  resumeUrl: '/resume.pdf',
  availableForWork: false,
  availabilityText: '',
  aboutParagraphs: [
    'As a seasoned Android Engineer, I bring over a decade of experience building native software across varying domains — from mobile ad tech and on-device app distribution platforms to dynamic social networks, streaming fitness applications, and public safety tools.',
    'My creative energy thrives in finding novel ways to present information with a keen focus on enhancing the user experience. I care deeply about delivering essential information clearly, pushing what is possible on Android, and crafting reliable, maintainable architectures in Kotlin and Jetpack Compose.'
  ],
  stats: [
    { value: `${yearsExperience}+`, label: 'Years Engineering' },
    { value: '64+', label: 'GitHub Repositories' },
    { value: 'Lead', label: 'Android Focus' }
  ],
  socials: [
    {
      label: 'GitHub',
      url: 'https://github.com/adfleshner'
    },
    {
      label: 'LinkedIn',
      url: 'https://www.linkedin.com/in/aaron-fleshner-60233750/'
    }
  ],
  support: [
    { label: 'Buy Me a Coffee', url: 'https://buymeacoffee.com/adfleshner' },
    { label: 'Venmo', url: 'https://venmo.com/u/Aaron-fleshner' },
    { label: 'Cash App', url: 'https://cash.app/$adfleshner' },
    { label: 'Revolut', url: 'https://revolut.me/aaron7bbx' }
  ]
}

