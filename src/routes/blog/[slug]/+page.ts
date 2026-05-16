import { error } from '@sveltejs/kit';
import { findBlogPost } from '$lib/content';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	const post = findBlogPost(params.slug);
	if (!post) error(404, 'Post not found');
	return { slug: params.slug, post };
};
