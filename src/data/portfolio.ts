import profilePhoto from '@/assets/profile.jpg'

export interface SocialLink {
  label: string
  url: string
}

export interface ExperienceItem {
  role: string
  roleFocus?: string
  company: string
  period: string
  location: string
  current?: boolean
  highlights: string[]
  technologies: string[]
}

export interface EducationItem {
  degree: string
  institution: string
  period: string
  details: string
}

export interface SkillGroup {
  category: string
  skills: string[]
}

export interface ProjectItem {
  id: string
  title: string
  tagline: string
  description: string
  category: 'Android' | 'Systems & Tools' | 'Web & Tools' | 'Open Source'
  featured: boolean
  technologies: string[]
  liveUrl?: string
  repoUrl?: string
  articleUrl?: string
  articleLabel?: string
  metrics?: string
}

export const profile = {
  name: 'Aaron Fleshner',
  firstName: 'Aaron',
  initials: 'AF',
  avatarUrl: profilePhoto,
  role: 'Lead Software Engineer',
  roleFocus: 'Android Focus',
  headline: 'I build thoughtful, reliable Android apps.',
  subheadline:
    'Lead Software Engineer (Android Focus) based in Durham, NC.',
  location: 'Durham, NC',
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
  ] satisfies SocialLink[]
}

export const experiences: ExperienceItem[] = [
  {
    role: 'Lead Software Engineer',
    roleFocus: 'Android Focus',
    company: 'Digital Turbine',
    period: 'March 2024 — Present',
    location: 'Durham, NC',
    current: true,
    highlights: [
      'Lead mobile architecture and engineering for Digital Turbine’s core Android SDKs and on-device app distribution platforms.',
      'Architect high-scale monetization and ad tech delivery features, balancing rich media experiences with strict performance, memory, and battery benchmarks.',
      'Champion modern Android practices, guiding the adoption of Kotlin, Jetpack Compose, and robust reactive architectures across distributed teams.'
    ],
    technologies: ['Kotlin', 'Jetpack Compose', 'Android SDK', 'Mobile Ad Tech', 'On-Device App Distribution', 'SDK Architecture', 'Gradle']
  },
  {
    role: 'Senior Android Engineer',
    company: 'lululemon',
    period: 'April 2022 — January 2024',
    location: 'Remote, US',
    highlights: [
      'Enhanced the Lululemon Studio Mirror companion app, streaming live and on-demand workouts to connected home fitness hardware.',
      'Spearheaded the ground-up development and integration of in-app subscriptions, directly expanding digital platform revenue capabilities.',
      'Collaborated with cross-functional remote teams of engineers, designers, and PMs to resolve UI/UX discrepancies between Android and iOS releases.'
    ],
    technologies: ['Kotlin', 'Android SDK', 'In-App Subscriptions', 'Streaming Media', 'Coroutines', 'CI/CD']
  },
  {
    role: 'Senior Android Engineer',
    company: 'WhiteStar Communications, Inc.',
    period: 'September 2019 — March 2022',
    location: 'Raleigh-Durham, NC',
    highlights: [
      'Served as lead designer and developer for the Society Secure Messenger Android app, a decentralized instant messaging platform without cloud dependency.',
      'Collaborated with Desktop and iOS teams to deliver seamless cross-platform communications.',
      'Supported cross-platform architecture design and ported the proprietary WhiteStar communications library to C++ to run across Android, iOS, Windows, and macOS.'
    ],
    technologies: ['Kotlin', 'Android SDK', 'C++', 'Encrypted Messaging', 'Cross-Platform Architecture']
  },
  {
    role: 'Android Engineer',
    company: 'Digital Turbine',
    period: 'June 2017 — September 2019',
    location: 'Durham, NC',
    highlights: [
      'Engineered core features and UI/UX improvements for Digital Turbine’s Ignite on-device app delivery and monetization platform.',
      'Collaborated with global engineering, product, and QA teams to scale mobile ad delivery and platform capabilities for carrier partners.',
      'Built build-time frameworks and developer tooling to improve speed, reliability, and release accuracy.'
    ],
    technologies: ['Java', 'Kotlin', 'Android SDK', 'Ignite Platform', 'Ad Tech & Monetization', 'Platform Frameworks']
  },
  {
    role: 'Senior Android Developer',
    company: 'Center For Advanced Public Safety',
    period: 'July 2012 — June 2017',
    location: 'Tuscaloosa, AL',
    highlights: [
      'Engineered mission-critical public safety apps for Alabama law enforcement and state transportation (including Tuscaloosa County Sheriff’s Office, Drive Sober Alabama, ALGOTraffic, and UA Safety).',
      'Architected backward-compatible support libraries ensuring reliable functionality across diverse Android hardware and OS versions.',
      'Published open-source utilities and templates (SimpleDrawerLayout, ObjectMapper, PushNotificationsTemplate).'
    ],
    technologies: ['Android SDK', 'Java', 'Public Safety Tech', 'Open Source', 'REST APIs']
  }
]

export const education: EducationItem[] = [
  {
    degree: 'Bachelor of Science (B.S.), Computer Science',
    institution: 'University of Alabama',
    period: '2006 — 2011',
    details: 'Coursework in software engineering, object-oriented design, algorithms, data structures, and mobile application development.'
  }
]

export const skillGroups: SkillGroup[] = [
  {
    category: 'Android & Mobile',
    skills: [
      'Kotlin',
      'Jetpack Compose',
      'Android SDK',
      'Kotlin Multiplatform (KMP)',
      'Coroutines & Flow',
      'Koin & Hilt / Dagger',
      'Room & SQLite',
      'Compose Navigation'
    ]
  },
  {
    category: 'Web & Frontend',
    skills: ['Vue 3', 'TypeScript', 'Vite', 'JavaScript (ESNext)', 'HTML5 & Modern CSS', 'Responsive UI']
  },
  {
    category: 'Mobile Ad Tech & Platforms',
    skills: [
      'On-Device App Distribution',
      'Mobile Ad Tech & Monetization',
      'High-Performance SDK Design',
      'Carrier & OEM Integrations',
      'Memory & Battery Optimization',
      'Telemetry & Analytics'
    ]
  },
  {
    category: 'Tools, Systems & DevOps',
    skills: ['Git / GitHub', 'Gradle Build Tool', 'CI/CD Pipelines', 'REST APIs', 'Web Scraping', 'Linux / Bash']
  }
]

export const projects: ProjectItem[] = [
  {
    id: 'random-love',
    title: 'Random-Love',
    tagline: 'Curated developer articles and tech stories Android client',
    description:
      'A sleek, lightweight native Android application that fetches and curates random articles, programming stories, and developer motivation with clean reactive state.',
    category: 'Android',
    featured: true,
    technologies: ['Android', 'Kotlin', 'Coroutines', 'Material 3'],
    repoUrl: 'https://github.com/adfleshner/Random-Love'
  },
  {
    id: 'hyerplex2',
    title: 'HyperPlex 2',
    tagline: 'Text decoding and algorithmic data transformation engine',
    description:
      'A fast, clean Kotlin-based text decoder and manipulation tool built for processing custom encoding patterns and cipher transformations.',
    category: 'Android',
    featured: true,
    technologies: ['Kotlin', 'Algorithms', 'Command Line', 'Unit Testing'],
    repoUrl: 'https://github.com/adfleshner/Hyerplex2'
  },
  {
    id: 'using-diffutil',
    title: 'Using-DiffUtil',
    tagline: 'High-performance Android lists with ViewBinding, RecyclerView, and DiffUtil',
    description:
      'Companion project and technical guide for building stutter-free Android lists. Demonstrates how to leverage AsyncListDiffer, custom DiffUtil callbacks, and ViewBinding to eliminate layout lag.',
    category: 'Android',
    featured: true,
    technologies: ['Android', 'Kotlin', 'RecyclerView', 'DiffUtil', 'ViewBinding', 'ListAdapter'],
    repoUrl: 'https://github.com/adfleshner/Using-DiffUtil',
    articleUrl: 'https://medium.com/@adfleshner/creating-a-list-easily-using-androids-viewbinding-recyclerview-and-diffutil-94116d418731',
    articleLabel: 'Medium Article',
    metrics: 'Article & Code'
  },
  {
    id: 'furballs',
    title: 'Furballs',
    tagline: 'Dog image gallery Android client powered by Dog API and Kotlin',
    description:
      'A native Android application consuming the Dog API (dog.ceo) to fetch, parse, and render dynamic dog breed images and photo galleries with responsive UI.',
    category: 'Android',
    featured: true,
    technologies: ['Android', 'Kotlin', 'Dog API', 'Retrofit/HTTP', 'Image Loading'],
    repoUrl: 'https://github.com/adfleshner/Furballs'
  },
  {
    id: 'athenahealth-scraper',
    title: 'AthenaHealth Scraper',
    tagline: 'Kotlin web scraping and automated extraction utility',
    description:
      'A resilient web scraping implementation rewritten in Kotlin to demonstrate type-safe HTTP requests, DOM parsing, and robust error recovery.',
    category: 'Systems & Tools',
    featured: false,
    technologies: ['Kotlin', 'Jsoup', 'Web Scraping', 'Data Pipelines'],
    repoUrl: 'https://github.com/adfleshner/AthenaHealthNameGetter'
  },
  {
    id: 'personal-site',
    title: 'Personal Portfolio & Resume',
    tagline: 'Modern, accessible Vue 3 + TypeScript portfolio application',
    description:
      'A responsive single-page portfolio and interactive resume built with Vue 3 (Composition API), Vite 6, TypeScript, Vue Router, and custom CSS design system.',
    category: 'Web & Tools',
    featured: true,
    technologies: ['Vue 3', 'TypeScript', 'Vite', 'Vue Router', 'CSS3'],
    repoUrl: 'https://github.com/adfleshner',
    metrics: 'Active'
  }
]
