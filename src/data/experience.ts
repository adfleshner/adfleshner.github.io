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

