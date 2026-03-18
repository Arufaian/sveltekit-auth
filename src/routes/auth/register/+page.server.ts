import { fail, redirect } from '@sveltejs/kit';

export const actions = {
	default: async ({ locals, request }) => {
		const formData = await request.formData();

		const email = formData.get('email') as string;
		const password = formData.get('password') as string;

		console.log({ email, password });

		const { error } = await locals.supabase.auth.signUp({
			email,
			password
		});

		console.log(error);

		if (error) {
			return fail(400, { message: error.message });
		}

		redirect(303, '/');
	}
};
