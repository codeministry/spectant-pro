import type { Dict } from './types';

export const de: Dict = {
  meta: {
    title: 'spectant: der lokale Spec-Begleiter für Entwickler',
    description:
      'Alle Markdown-Specs aus allen Repositories auf einem Live-Dashboard, direkt auf deinem Rechner. spectant ist in aktiver Entwicklung; verfolge den Fortschritt auf GitHub.',
    ogLocale: 'de_DE',
  },
  nav: {
    how: 'So funktioniert’s',
    roadmap: 'Roadmap',
    github: 'Auf GitHub folgen',
    switchLabel: 'English',
    theme: { toLight: 'Zum hellen Farbschema wechseln', toDark: 'Zum dunklen Farbschema wechseln' },
    skip: 'Zum Inhalt springen',
  },
  hero: {
    badge: 'In aktiver Entwicklung · Pre-Release',
    titleA: 'Alle Specs.',
    titleB: 'Ein Tab.',
    lead: 'spectant ist der lokale Spec-Begleiter für Entwickler. Ein einzelnes Binary liest die Markdown-Specs aller Repositories, die du registrierst, und zeigt, wo jede steht, was als Nächstes kommt und was Aufmerksamkeit braucht. Es läuft auf deinem Rechner, und nichts verlässt ihn.',
    ctaPrimary: 'Auf GitHub folgen',
    ctaSecondary: 'So funktioniert’s',
    installSoon: 'bald verfügbar',
    installNote: 'Eine Zeile für macOS und Linux, sobald das erste Release erscheint.',
  },
  board: {
    label: 'Dashboard-Vorschau',
    demo: 'Demodaten',
    stages: { planned: 'geplant', tasked: 'zerlegt', implementing: 'in Arbeit', closed: 'erledigt' },
    repos: 'Repos',
    claims: 'Claims',
    live: 'live',
  },
  features: {
    eyebrow: 'Was es kann',
    title: 'Deine Specs bleiben in deinen Repos. spectant zeigt sie.',
    lead: 'Die Markdown-Dateien sind die einzige Quelle der Wahrheit. spectant liest sie, stellt sie nebeneinander und hält Schritt, während du und deine Agenten arbeiten.',
    stageFirst: 'erstes Release',
    stageLater: 'später',
    items: [
      {
        title: 'Alle Repos, ein Bildschirm',
        text: 'Registriere deine Repositories einmal. Jede Spec erscheint nebeneinander, mit Stand, Fortschritt und dem nächsten offenen Schritt.',
        stage: 'first',
      },
      {
        title: 'Live, an Ort und Stelle',
        text: 'Du bearbeitest eine Spec im Editor, das Dashboard zieht nach. Kein Build-Schritt, keine gerenderten Seiten, kein Neuladen.',
        stage: 'first',
      },
      {
        title: 'Nur lokal',
        text: 'Ein Binary, UI, Schriften und Icons sind eingebaut. Der Server lauscht nur auf Loopback, kein Codepfad ruft nach draußen.',
        stage: 'first',
      },
      {
        title: 'Nur lesend, by design',
        text: 'spectant schreibt nie in deine registrierten Repositories, nicht einmal in .git. Deine Dateien bleiben deine.',
        stage: 'first',
      },
      {
        title: 'Agent-Board',
        text: 'Sieh, welcher Agent welche Aufgabe in welchem Worktree hält, und wie seine Probe von Rot auf Grün springt.',
        stage: 'later',
      },
      {
        title: 'Claude-Code-Plugin',
        text: 'Spec-getriebenes Arbeiten mit einem Plugin, dessen wenige Befehle man sich merken kann. Es schreibt nur Markdown.',
        stage: 'later',
      },
    ],
  },
  preview: {
    eyebrow: 'Vorschau',
    title: 'Wohin die App steuert.',
    lead: 'Screens aus dem Design-Prototyp, gegen den spectant gebaut wird. Dunkles Theme und Demodaten: Die App zeigt diese Seiten noch nicht.',
    badge: 'Design-Prototyp',
    open: 'In voller Größe öffnen',
    close: 'Schließen',
    items: [
      { label: 'Alle Workspaces', alt: 'Workspace-Übersicht: jedes registrierte Repository als Karte mit Master- und Spec-Claims, Specs, Warnungen und Next up' },
      { label: 'Workspace', alt: 'Workspace-Dashboard: Master- und Spec-Claims, was jetzt baubar ist, Next up mit dem nächsten Befehl, TL;DR, Spec-Liste und Warnungen' },
      { label: 'Bibliothek', alt: 'Bibliothek: alle Pläne, Designs, Entscheidungen und Notizen eines Workspaces, durchsuchbar, veraltete Dokumente markiert' },
      { label: 'Spec-Dashboard', alt: 'Spec-Dashboard: Kennzahlen, die Idee, nächster Schritt mit Begründung und Lanes, daneben eine Leiste mit dem, was auf dich wartet, Warnungen und Gates' },
      { label: 'Status', alt: 'Statusbereich: warum dieser nächste Schritt, Fortschritt und Gates, wo die Spec steht' },
      { label: 'Live-Board', alt: 'Live-Board: eine Lane pro Spalte, in Arbeit, wartend und gelandet, mit Needs-you-Leiste' },
      { label: 'Tasks', alt: 'Tasks-Tab: Checkbox-Zustände, Lane- und Status-Chips, Probe-Zuordnung' },
      { label: 'Notizen', alt: 'Notizen: Workspace-Notizblock mit Ankern zu Spec, Claim oder Task' },
    ],
  },
  how: {
    eyebrow: 'So funktioniert’s',
    title: 'Drei Befehle. Das ist das ganze Setup.',
    lead: 'Einmal installieren, die Repositories registrieren, die dir wichtig sind, Dashboard öffnen.',
    note: 'Geplante CLI, bis zum ersten Release kann sich noch etwas ändern.',
    steps: [
      { cmd: null, text: 'Installiert ein einzelnes Binary für macOS oder Linux, arm64 oder x64. Kein sudo, keine Änderungen an der Shell.' },
      { cmd: 'spectant add ~/code/my-project', text: 'Registriert ein Repository. spectant merkt sich nur den Pfad.' },
      { cmd: 'spectant', text: 'Öffnet das Dashboard im Browser, ausgeliefert von 127.0.0.1.' },
    ],
  },
  roadmap: {
    eyebrow: 'Öffentlich gebaut',
    title: 'Wo spectant heute steht',
    lead: 'spectant entsteht Spec für Spec, genau so, wie es dich arbeiten lassen will. Das ist der ehrliche Stand.',
    status: { progress: 'in Arbeit', next: 'als Nächstes', planned: 'geplant' },
    items: [
      {
        title: 'App-Grundgerüst und Dashboard',
        text: 'Das Binary, der Loopback-Server und das erste Dashboard mit echten Repositories.',
        status: 'progress',
      },
      {
        title: 'Shell und Spec-Seite',
        text: 'Eine vollständige Spec-Ansicht mit Status, Daten, Doku und Notizen in einer Shell.',
        status: 'next',
      },
      {
        title: 'Live-Status und Agent-Board',
        text: 'Jeder Stufenwechsel in dem Moment, in dem er passiert, und welcher Agent woran arbeitet.',
        status: 'planned',
      },
      {
        title: 'Claude-Code-Plugin',
        text: 'Der Spec-Workflow als eigenständiges Plugin, das den Parser von spectant mitnutzt.',
        status: 'planned',
      },
      {
        title: 'Erstes öffentliches Release',
        text: 'Signierte Binaries und die Ein-Zeilen-Installation für macOS und Linux.',
        status: 'planned',
      },
    ],
  },
  footer: {
    ctaTitle: 'Verfolge den Bau',
    ctaText: 'Beobachte das Repository und erfahre sofort, wenn das erste Release erscheint.',
    ctaButton: 'Auf GitHub folgen',
    madeBy: 'Gebaut mit ❤️ von',
    license: 'Open Source unter Apache-2.0',
    imprint: 'Impressum',
    privacy: 'Datenschutz',
    legalNote: '',
  },
  notFound: {
    title: 'Diese Seite ist noch eine Spec.',
    text: 'Hier gibt es noch nichts. Die gesuchte Seite existiert nicht.',
    back: 'Zurück zum Start',
  },
};
