import type { Dict } from './types';

export const en: Dict = {
  meta: {
    title: 'spectant: the local spec companion for developers',
    description:
      'Every Markdown spec from every repository on one live dashboard, running on your machine. spectant is in active development; follow the build on GitHub.',
    ogLocale: 'en_US',
  },
  nav: {
    how: 'How it works',
    roadmap: 'Roadmap',
    github: 'Watch on GitHub',
    switchLabel: 'Deutsch',
    theme: { toLight: 'Switch to light theme', toDark: 'Switch to dark theme' },
    skip: 'Skip to content',
  },
  hero: {
    badge: 'In active development · pre-release',
    titleA: 'All your specs.',
    titleB: 'One tab.',
    lead: 'spectant is the local spec companion for developers. One binary reads the Markdown specs in every repository you register and shows where each one stands, what comes next and what needs attention. It runs on your machine, and nothing leaves it.',
    ctaPrimary: 'Watch on GitHub',
    ctaSecondary: 'How it works',
    installSoon: 'coming soon',
    installNote: 'One line for macOS and Linux, once the first release ships.',
  },
  board: {
    label: 'Dashboard preview',
    demo: 'demo data',
    stages: { planned: 'planned', tasked: 'tasked', implementing: 'implementing', closed: 'closed' },
    repos: 'repos',
    claims: 'claims',
    live: 'live',
  },
  features: {
    eyebrow: 'What it does',
    title: 'Your specs stay in your repos. spectant shows them.',
    lead: 'The Markdown files are the single source of truth. spectant reads them, puts them side by side and keeps up while you and your agents work.',
    stageFirst: 'first release',
    stageLater: 'later',
    items: [
      {
        title: 'Every repo, one screen',
        text: 'Register your repositories once. Every spec shows up side by side with its stage, its progress and the next open step.',
        stage: 'first',
      },
      {
        title: 'Live, in place',
        text: 'Edit a spec in your editor and the dashboard follows. No build step, no rendered pages, no refresh.',
        stage: 'first',
      },
      {
        title: 'Local only',
        text: 'One binary with the UI, fonts and icons built in. The server listens on loopback, and no code path calls out.',
        stage: 'first',
      },
      {
        title: 'Read-only by design',
        text: 'spectant never writes into the repositories you register, not even into .git. Your files stay yours.',
        stage: 'first',
      },
      {
        title: 'Agent board',
        text: 'See which agent holds which task in which worktree, and watch its probe go from red to green.',
        stage: 'later',
      },
      {
        title: 'Claude Code plugin',
        text: 'Spec-driven work from a plugin with a handful of commands you can remember. It writes only Markdown.',
        stage: 'later',
      },
    ],
  },
  preview: {
    eyebrow: 'Sneak peek',
    title: 'Where the app is heading.',
    lead: 'Screens from the design prototype spectant is being built against. Dark theme and demo data: the app does not render these pages yet.',
    badge: 'design prototype',
    open: 'Open full size',
    close: 'Close',
    items: [
      { label: 'Spec dashboard', alt: 'Spec dashboard: key numbers, the idea, next step with reason, lanes and area tiles' },
      { label: 'Status', alt: 'Status area: why this next step, progress and gates, where the spec stands' },
      { label: 'Live board', alt: 'Live board: one lane per column, in flight, waiting and landed, with a needs-you rail' },
      { label: 'Tasks', alt: 'Tasks tab: checkbox states, lane and state chips, probe mapping' },
      { label: 'Notes', alt: 'Notes: workspace notepad with anchors to a spec, claim or task' },
    ],
  },
  how: {
    eyebrow: 'How it works',
    title: 'Three commands. That is the whole setup.',
    lead: 'Install once, register the repositories you care about, open the dashboard.',
    note: 'Planned CLI, subject to change until the first release.',
    steps: [
      { cmd: null, text: 'Installs a single binary for macOS or Linux, arm64 or x64. No sudo, no shell edits.' },
      { cmd: 'spectant add ~/code/my-project', text: 'Registers a repository. spectant only remembers the path.' },
      { cmd: 'spectant', text: 'Opens the dashboard in your browser, served from 127.0.0.1.' },
    ],
  },
  roadmap: {
    eyebrow: 'Built in public',
    title: 'Where spectant stands today',
    lead: 'spectant is built spec by spec, the same way it wants you to work. This is the honest state.',
    status: { progress: 'in progress', next: 'up next', planned: 'planned' },
    items: [
      {
        title: 'App skeleton and dashboard',
        text: 'The binary, the loopback server and the first dashboard with real repositories.',
        status: 'progress',
      },
      {
        title: 'Shell and spec page',
        text: 'A full spec view with status, data, docs and notes in one shell.',
        status: 'next',
      },
      {
        title: 'Live state and agent board',
        text: 'Every stage change as it happens, and which agent works on what.',
        status: 'planned',
      },
      {
        title: 'Claude Code plugin',
        text: 'The spec workflow as a standalone plugin that shares spectant’s parser.',
        status: 'planned',
      },
      {
        title: 'First public release',
        text: 'Signed binaries and the one-line install for macOS and Linux.',
        status: 'planned',
      },
    ],
  },
  footer: {
    ctaTitle: 'Follow the build',
    ctaText: 'Watch the repository and get notified when the first release lands.',
    ctaButton: 'Watch on GitHub',
    madeBy: 'Built with ❤️ by',
    license: 'Open source under Apache-2.0',
    imprint: 'Legal notice',
    privacy: 'Privacy',
    legalNote: '(German)',
  },
  notFound: {
    title: 'This page is still a spec.',
    text: 'Nothing here yet. The page you were looking for does not exist.',
    back: 'Back to the start',
  },
};
