import { useEffect, useState } from 'react';
import type { Dict, Locale } from '../i18n/types';

// Demo-only dashboard mock: specs of three made-up repositories advance through the stages on a timer.
// Rendered on the server as a static first frame; the island only adds the motion.

type Stage = 'planned' | 'tasked' | 'implementing' | 'closed';

interface Spec {
  id: string;
  title: string;
  stage: Stage;
  done: number;
  total: number;
}

interface Repo {
  name: string;
  specs: Spec[];
}

const INITIAL: Repo[] = [
  {
    name: 'harbor',
    specs: [
      { id: '003', title: 'Auth flow', stage: 'implementing', done: 7, total: 12 },
      { id: '004', title: 'Billing export', stage: 'tasked', done: 0, total: 9 },
    ],
  },
  {
    name: 'lantern',
    specs: [
      { id: '011', title: 'Offline sync', stage: 'implementing', done: 10, total: 14 },
      { id: '012', title: 'Search index', stage: 'planned', done: 0, total: 8 },
    ],
  },
  {
    name: 'atlas',
    specs: [
      { id: '001', title: 'App skeleton', stage: 'closed', done: 6, total: 6 },
      { id: '002', title: 'Rate limits', stage: 'implementing', done: 2, total: 7 },
    ],
  },
];

const TICK_MS = 1500;

const CHIP: Record<Stage, string> = {
  planned: 'badge-secondary',
  tasked: 'badge-primary',
  implementing: 'badge-warning',
  closed: 'badge-accent',
};

const RING: Record<Stage, string> = {
  planned: 'text-secondary',
  tasked: 'text-primary',
  implementing: 'text-warning',
  closed: 'text-accent',
};

function advance(spec: Spec): Spec {
  switch (spec.stage) {
    case 'planned':
      return { ...spec, stage: 'tasked' };
    case 'tasked':
      return { ...spec, stage: 'implementing', done: 1 };
    case 'implementing': {
      const done = spec.done + 1;
      return { ...spec, done, stage: done >= spec.total ? 'closed' : 'implementing' };
    }
    default:
      return spec;
  }
}

function Ring({ spec }: { spec: Spec }) {
  const r = 10;
  const c = 2 * Math.PI * r;
  const filled = spec.total === 0 ? 0 : (spec.done / spec.total) * c;
  return (
    <svg viewBox="0 0 26 26" className={`size-6 shrink-0 ${RING[spec.stage]}`} aria-hidden="true">
      <circle cx="13" cy="13" r={r} fill="none" stroke="currentColor" strokeOpacity="0.18" strokeWidth="3" />
      <circle
        cx="13"
        cy="13"
        r={r}
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray={`${filled} ${c}`}
        transform="rotate(-90 13 13)"
        className="transition-[stroke-dasharray] duration-500 ease-out"
      />
    </svg>
  );
}

interface Props {
  locale: Locale;
  labels: Dict['board'];
}

interface BoardState {
  repos: Repo[];
  /** `repo/id` of the spec that moved last, highlighted for one tick. */
  changed: string | null;
  tick: number;
}

const START: BoardState = { repos: INITIAL, changed: null, tick: 0 };

/** Advances one open spec per tick, round-robin; starts over once everything is closed. */
function step(state: BoardState): BoardState {
  const open = state.repos.flatMap((repo) =>
    repo.specs.filter((spec) => spec.stage !== 'closed').map((spec) => ({ repo: repo.name, id: spec.id })),
  );
  if (open.length === 0) return START;
  const target = open[state.tick % open.length];
  return {
    tick: state.tick + 1,
    changed: `${target.repo}/${target.id}`,
    repos: state.repos.map((repo) =>
      repo.name !== target.repo
        ? repo
        : { ...repo, specs: repo.specs.map((spec) => (spec.id === target.id ? advance(spec) : spec)) },
    ),
  };
}

export default function SpecBoard({ labels }: Props) {
  const [{ repos, changed }, setState] = useState<BoardState>(START);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setInterval(() => setState(step), TICK_MS);
    return () => window.clearInterval(timer);
  }, []);

  const all = repos.flatMap((repo) => repo.specs);
  const closed = all.filter((spec) => spec.stage === 'closed').length;
  const done = all.reduce((sum, spec) => sum + spec.done, 0);
  const total = all.reduce((sum, spec) => sum + spec.total, 0);

  return (
    <figure
      aria-label={`${labels.label} (${labels.demo})`}
      className="spec-card relative shadow-2xl shadow-black/10 [--card-accent:var(--color-primary)]"
    >
      <div className="flex items-center gap-3 border-b border-line px-4 py-3">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="size-2.5 rounded-full bg-line" />
          <span className="size-2.5 rounded-full bg-line" />
          <span className="size-2.5 rounded-full bg-line" />
        </span>
        <span className="flex-1 truncate text-center font-mono text-xs text-muted">127.0.0.1:7717</span>
        <span className="inline-flex items-center gap-1.5 font-mono text-[0.7rem] uppercase tracking-wider text-muted">
          <span className="live-dot scale-75" aria-hidden="true" />
          {labels.live}
        </span>
      </div>

      <div className="p-4 sm:p-5">
        <div className="flex items-center justify-between gap-3">
          <p className="eyebrow">{labels.label}</p>
          <span className="badge badge-sm badge-ghost font-mono">{labels.demo}</span>
        </div>

        <dl className="mt-4 grid grid-cols-3 gap-2 text-center">
          <div className="rounded-field bg-base-200/70 px-2 py-2.5">
            <dt className="text-[0.7rem] text-muted">{labels.repos}</dt>
            <dd className="font-mono text-lg font-semibold tabular-nums">{repos.length}</dd>
          </div>
          <div className="rounded-field bg-base-200/70 px-2 py-2.5">
            <dt className="text-[0.7rem] text-muted">{labels.stages.closed}</dt>
            <dd className="font-mono text-lg font-semibold tabular-nums text-accent">
              {closed}/{all.length}
            </dd>
          </div>
          <div className="rounded-field bg-base-200/70 px-2 py-2.5">
            <dt className="text-[0.7rem] text-muted">{labels.claims}</dt>
            <dd className="font-mono text-lg font-semibold tabular-nums">
              {done}/{total}
            </dd>
          </div>
        </dl>

        <div className="mt-4 space-y-3">
          {repos.map((repo) => (
            <section key={repo.name}>
              <h3 className="mb-1.5 font-mono text-xs text-muted">~/code/{repo.name}</h3>
              <ul className="space-y-1.5">
                {repo.specs.map((spec) => {
                  const key = `${repo.name}/${spec.id}`;
                  return (
                    <li
                      key={spec.id}
                      className={`flex items-center gap-3 rounded-field border px-3 py-2 transition-colors duration-500 ${
                        changed === key ? 'border-primary/40 bg-base-300/60' : 'border-transparent bg-base-200/50'
                      }`}
                    >
                      <Ring spec={spec} />
                      <span className="font-mono text-xs text-primary">{spec.id}</span>
                      <span className="min-w-0 flex-1 truncate text-sm font-medium">{spec.title}</span>
                      <span className="hidden font-mono text-xs tabular-nums text-muted sm:inline">
                        {spec.done}/{spec.total}
                      </span>
                      <span className={`badge badge-soft badge-sm w-24 shrink-0 justify-center ${CHIP[spec.stage]}`}>
                        {labels.stages[spec.stage]}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </figure>
  );
}
