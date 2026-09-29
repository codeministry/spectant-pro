export type Locale = 'en' | 'de';

export interface Feature {
  title: string;
  text: string;
  /** 'first' ships with the first release, 'later' is planned after it. */
  stage: 'first' | 'later';
}

export interface RoadmapItem {
  title: string;
  text: string;
  status: 'progress' | 'next' | 'planned';
}

export interface Dict {
  meta: { title: string; description: string; ogLocale: string };
  nav: {
    how: string;
    roadmap: string;
    github: string;
    switchLabel: string;
    theme: { toLight: string; toDark: string };
    skip: string;
  };
  hero: {
    badge: string;
    titleA: string;
    titleB: string;
    lead: string;
    ctaPrimary: string;
    ctaSecondary: string;
    installSoon: string;
    installNote: string;
  };
  board: {
    label: string;
    demo: string;
    stages: { planned: string; tasked: string; implementing: string; closed: string };
    repos: string;
    claims: string;
    live: string;
  };
  features: {
    eyebrow: string;
    title: string;
    lead: string;
    stageFirst: string;
    stageLater: string;
    items: Feature[];
  };
  preview: {
    eyebrow: string;
    title: string;
    lead: string;
    badge: string;
    open: string;
    close: string;
    /** Same order as the screenshots in Preview.astro. */
    items: { label: string; alt: string }[];
  };
  how: {
    eyebrow: string;
    title: string;
    lead: string;
    note: string;
    /** Step one is always the install command from site.config; only its caption is translated. */
    steps: { cmd: string | null; text: string }[];
  };
  roadmap: {
    eyebrow: string;
    title: string;
    lead: string;
    status: { progress: string; next: string; planned: string };
    items: RoadmapItem[];
  };
  footer: {
    ctaTitle: string;
    ctaText: string;
    ctaButton: string;
    madeBy: string;
    license: string;
    imprint: string;
    privacy: string;
    legalNote: string;
  };
  notFound: { title: string; text: string; back: string };
}
