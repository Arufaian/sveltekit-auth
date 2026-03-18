import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const actions: Actions = {
	default: async ({ locals, request }) => {
		const formData = await request.formData();

		const email = String(formData.get('email') ?? '')
			.trim()
			.toLowerCase();
		const password = String(formData.get('password') ?? '');

		const fieldErrors: { email?: string; password?: string } = {};

		if (!email) {
			fieldErrors.email = 'Email wajib diisi.';
		} else if (!EMAIL_PATTERN.test(email)) {
			fieldErrors.email = 'Format email tidak valid.';
		}

		if (!password) {
			fieldErrors.password = 'Password wajib diisi.';
		} else if (password.length < 6) {
			fieldErrors.password = 'Password minimal 6 karakter.';
		}

		if (fieldErrors.email || fieldErrors.password) {
			return fail(400, {
				message: 'Silakan periksa kembali input Anda.',
				fieldErrors,
				values: { email }
			});
		}

		const { error } = await locals.supabase.auth.signUp({
			email,
			password
		});

		if (error) {
			return fail(400, {
				message: error.message,
				fieldErrors: {},
				values: { email }
			});
		}

		throw redirect(303, '/');
	}
};
