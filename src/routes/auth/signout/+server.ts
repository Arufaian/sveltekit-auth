import { redirect } from '@sveltejs/kit';

export const POST = async ({ locals }) => {
	const { error } = await locals.supabase.auth.signOut();

	if (error) {
		console.error('Error signing out:', error.message);
	}

	throw redirect(303, '/auth/register');
};
