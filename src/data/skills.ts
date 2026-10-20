export interface SkillGroup {
  category: string
  skills: string[]
}

export interface EducationItem {
  degree: string
  institution: string
  period: string
  details: string
}

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

export const education: EducationItem[] = [
  {
    degree: 'Bachelor of Science (B.S.), Computer Science',
    institution: 'University of Alabama',
    period: '2006 — 2011',
    details: 'Coursework in software engineering, object-oriented design, algorithms, data structures, and mobile application development.'
  }
]

