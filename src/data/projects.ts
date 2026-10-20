export type ProjectCategory = 'Android' | 'Systems & Tools' | 'Web & Tools' | 'Open Source'

export interface ProjectItem {
  id: string
  title: string
  tagline: string
  description: string
  category: ProjectCategory
  featured: boolean
  current?: boolean
  technologies: string[]
  liveUrl?: string
  liveLabel?: string
  repoUrl?: string
  articleUrl?: string
  articleLabel?: string
  metrics?: string
}

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
    id: 'dt-ignite',
    title: 'DT Ignite',
    tagline: 'Frictionless on-device app discovery, dynamic delivery, and lifecycle monetization.',
    description:
      'On-device software platform embedded at carrier and OEM firmware level across hundreds of millions of Android devices, letting operators, manufacturers and developers deliver, manage and update apps over the air without traditional app-store funnels. Includes the Ignite Services SDK for background installs, app metadata checks and conversion telemetry.',
    category: 'Android',
    featured: true,
    current: true,
    technologies: ['Android SDK', 'Kotlin', 'Java', 'AIDL / IPC', 'OTA App Delivery', 'SDK Architecture'],
    liveUrl: 'https://www.digitalturbine.com/',
    liveLabel: 'Project Page',
    metrics: 'DT · Current'
  },
  {
    id: 'diving-dd-calculator',
    title: 'Diving DD Calculator',
    tagline: 'Degree-of-difficulty calculator for springboard and platform diving.',
    description:
      'A personal Android tool, built by a former Team USA diver, that digitizes degree-of-difficulty (DD) calculation from dive number, body position, twists and board height so divers and coaches can avoid manual lookup errors on competition dive sheets.',
    category: 'Android',
    featured: false,
    technologies: ['Android', 'Java', 'Android SDK', 'DD Formula Logic'],
    metrics: 'Personal'
  },
  {
    id: 'tcso-app',
    title: "Tuscaloosa County Sheriff's Office",
    tagline: 'Official public safety and community alert app for Tuscaloosa County.',
    description:
      "Built at the Center for Advanced Public Safety (University of Alabama) with the Tuscaloosa County Sheriff's Office. Lets residents search active warrants, recent arrests and most-wanted listings, view mapped sex offender registries and storm shelters, receive emergency push alerts, and submit anonymous tips.",
    category: 'Android',
    featured: true,
    technologies: ['Android SDK', 'Java', 'Google Maps API', 'REST APIs', 'Push Notifications', 'Location Services'],
    liveUrl: 'https://play.google.com/store/apps/details?id=edu.ua.caps.tcsopublic&hl=en_US',
    liveLabel: 'Google Play',
    metrics: 'CAPS'
  },
  {
    id: 'society',
    title: 'SOCIETY: Secure Social Network',
    tagline: 'Decentralized secure messaging and private communities without cloud dependency.',
    description:
      "Decentralized communication platform from WhiteStar Communications offering end-to-end encrypted messaging, private and public communities, and peer-to-peer file sharing across mobile and desktop, powered by WhiteStar's proprietary networking protocols and a cross-platform C++ core library. No longer on Google Play.",
    category: 'Android',
    featured: true,
    technologies: ['Kotlin', 'Android SDK', 'C++', 'End-to-End Encryption', 'Peer-to-Peer Architecture'],
    metrics: 'WhiteStar · Retired'
  },
  {
    id: 'g-fuel',
    title: 'G FUEL',
    tagline: 'Official mobile storefront for exclusive G FUEL drops and VIP deals.',
    description:
      'Official mobile commerce app for the gaming and esports energy drink brand, with early access to limited-edition collector boxes, app-exclusive flavor drops, VIP promotions and restock alerts, integrated with Shopify for a streamlined shopping and order-tracking experience.',
    category: 'Android',
    featured: false,
    technologies: ['Android SDK', 'Shopify Storefront API', 'Push Notifications (FCM)'],
    liveUrl: 'https://play.google.com/store/apps/details?id=com.aeron.shopifycore.gfuel&hl=en_US',
    liveLabel: 'Google Play',
    metrics: 'GFuel'
  },
  {
    id: 'algotraffic',
    title: 'ALGO Traffic',
    tagline: 'Real-time Alabama traffic alerts, live highway cameras, and road conditions.',
    description:
      "Alabama's official traveler information app, built at the Center for Advanced Public Safety with ALDOT and ALEA. Delivers real-time incidents, statewide live traffic cameras, construction alerts and digital message sign readouts, plus a hands-free Driving Mode with audible hazard and weather alerts.",
    category: 'Android',
    featured: true,
    technologies: ['Android SDK', 'Java', 'REST APIs', 'Location Services', 'HERE Maps SDK', 'Push Notifications'],
    liveUrl: 'https://play.google.com/store/apps/details?id=edu.ua.caps.aldotAlgoTraffic&hl=en_US',
    liveLabel: 'Google Play',
    metrics: 'CAPS'
  },
  {
    id: 'personal-site',
    title: 'Personal Portfolio',
    tagline: 'Modern, accessible Vue 3 + TypeScript portfolio application',
    description:
      'A responsive single-page portfolio built with Vue 3 (Composition API), Vite 6, TypeScript, Vue Router, and custom CSS design system.',
    category: 'Web & Tools',
    featured: true,
    technologies: ['Vue 3', 'TypeScript', 'Vite', 'Vue Router', 'CSS3'],
    repoUrl: 'https://github.com/adfleshner',
    metrics: 'Active'
  }
]

export const productionAppIds = [
  'dt-ignite',
  'algotraffic',
  'tcso-app',
  'society',
  'g-fuel',
  'diving-dd-calculator'
] as const

export const productionApps: ProjectItem[] = productionAppIds
  .map((id) => projects.find((p) => p.id === id))
  .filter((p): p is ProjectItem => Boolean(p))

