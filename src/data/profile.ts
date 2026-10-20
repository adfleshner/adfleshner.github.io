import profilePhoto from '@/assets/profile.jpg'
import portraitBwPhoto from '@/assets/photos/aaron-portrait-bw.jpg'

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
    { value: '12+', label: 'Years Engineering' },
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
  ]
}

