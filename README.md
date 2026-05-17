# junttila.dev

Personal CV and freelancing portfolio site for Niko Junttila — freelance web developer based in Kokkola, Finland.

The site presents the services I offer (landing pages, WordPress sites, online stores, custom builds and hourly work), past projects, process, testimonials, and a small blog. Available in Finnish and English.

Live: <https://junttila.dev>

## Stack

- **SvelteKit** (Svelte 5)
- **TypeScript**
- **Tailwind CSS** with `@tailwindcss/typography`
- **Paraglide** for i18n (fi / en)
- **Deno** as the package manager / runtime
- **Prettier** for formatting

## Project layout

- `src/lib/content.ts` — all site copy (both languages), portfolio entries, contact details and theme tokens
- `src/lib/components/` — Svelte components
- `src/routes/` — pages, blog and API routes
- `messages/` — Paraglide translation sources
- `static/` — images and other static assets

## Development

```sh
deno install
deno task dev
# or open in a browser tab
deno task dev -- --open
```

## Build

```sh
deno task build
deno task preview
```

## Other tasks

```sh
deno task check    # type-check with svelte-check
deno task lint     # prettier --check
deno task format   # prettier --write
```

A `Taskfile.yml` is also included if you prefer [Task](https://taskfile.dev) (`task dev`, `task build`, etc.).

## Contact

- Email: `niko@junttila.dev`
- GitHub: <https://github.com/nikojunttila>
