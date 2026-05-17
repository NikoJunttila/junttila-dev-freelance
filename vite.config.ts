import { execSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import tailwindcss from '@tailwindcss/vite';
import { paraglideVitePlugin } from '@inlang/paraglide-js';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

const pkg = JSON.parse(
	readFileSync(fileURLToPath(new URL('./package.json', import.meta.url)), 'utf-8')
);
const [major = '0', minor = '0'] = String(pkg.version ?? '0.0').split('.');

let patch = '0';
try {
	patch = execSync('git rev-list --count HEAD', { stdio: ['ignore', 'pipe', 'ignore'] })
		.toString()
		.trim();
} catch {
	patch = String(pkg.version ?? '0.0.0').split('.')[2] ?? '0';
}

const appVersion = `${major}.${minor}.${patch}`;

export default defineConfig({
	define: {
		__APP_VERSION__: JSON.stringify(appVersion)
	},
	plugins: [
		tailwindcss(),
		sveltekit(),
		paraglideVitePlugin({ project: './project.inlang', outdir: './src/lib/paraglide' })
	]
});
