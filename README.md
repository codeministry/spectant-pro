# spectant.pro

The coming-soon landing page for [Spectant](https://github.com/codeministry/spectant), the local spec companion
for developers.

Astro 7 (static), Tailwind 4, daisyUI 5 and a single React island. English at `/`, German at `/de`.

```sh
bun install
bun run dev       # local dev server
bun run verify    # type check, build, dist gate
```

The site is served by nginx from `ghcr.io/codeministry/spectant-pro` on cm-k8s-cluster. See `CLAUDE.md` for
conventions and deployment.
