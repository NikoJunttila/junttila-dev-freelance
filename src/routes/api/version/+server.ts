import { json } from '@sveltejs/kit';

export const GET = () => json({ version: __APP_VERSION__ });
