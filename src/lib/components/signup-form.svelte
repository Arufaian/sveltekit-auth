<script lang="ts">
	import { cn } from '$lib/utils.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Field from '$lib/components/ui/field/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Spinner } from '$lib/components/ui/spinner/index.js';
	import type { HTMLAttributes } from 'svelte/elements';

	import { enhance } from '$app/forms';

	type SignupFormState = {
		message?: string;
		fieldErrors?: {
			email?: string;
			password?: string;
		};
		values?: {
			email?: string;
		};
	};

	let {
		class: className,
		form = undefined,
		...restProps
	}: HTMLAttributes<HTMLDivElement> & {
		form?: SignupFormState | null;
	} = $props();

	// Menyimpan nilai input agar tombol submit hanya aktif saat valid.
	let email = $state('');
	let password = $state('');

	const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	const isEmailValid = $derived(emailPattern.test(email));
	const isPasswordValid = $derived(password.length >= 6);

	const emailError = $derived(form?.fieldErrors?.email);
	const passwordError = $derived(form?.fieldErrors?.password);
	const formMessage = $derived(form?.message);

	const emailDescribedBy = $derived(
		emailError ? 'email-description email-error' : 'email-description'
	);
	const passwordDescribedBy = $derived(
		passwordError ? 'password-description password-error' : 'password-description'
	);

	const isFormReady = $derived(isEmailValid && isPasswordValid);
	let isSubmitting = $state(false);
</script>

<div class={cn('flex flex-col gap-6', className)} {...restProps}>
	<Card.Root>
		<Card.Header class="text-center">
			<Card.Title class="text-xl">Create your account</Card.Title>
			<Card.Description>Enter your email below to create your account</Card.Description>
		</Card.Header>
		<Card.Content>
			<!-- Saat submit, form dikunci agar tidak terjadi double submit. -->
			<form
				use:enhance={() => {
					isSubmitting = true;

					return async ({ update }) => {
						try {
							await update({ reset: false });
						} finally {
							isSubmitting = false;
						}
					};
				}}
				method="post"
				aria-busy={isSubmitting}
			>
				<p class="sr-only" aria-live="polite">
					{isSubmitting ? 'Sedang membuat akun, mohon tunggu.' : ''}
				</p>

				{#if formMessage}
					<Field.Error>{formMessage}</Field.Error>
				{/if}

				<Field.Group>
					<Field.Field>
						<Field.Label for="email">Email</Field.Label>
						<Input
							id="email"
							type="email"
							name="email"
							placeholder="m@example.com"
							required
							bind:value={email}
							aria-invalid={Boolean(emailError)}
							aria-describedby={emailDescribedBy}
							disabled={isSubmitting}
						/>
						<Field.Description id="email-description"
							>Gunakan email aktif yang bisa diakses.</Field.Description
						>
						{#if emailError}
							<Field.Error id="email-error">{emailError}</Field.Error>
						{/if}
					</Field.Field>
					<Field.Field>
						<Field.Label for="password">Password</Field.Label>
						<Input
							id="password"
							type="password"
							name="password"
							required
							bind:value={password}
							aria-invalid={Boolean(passwordError)}
							aria-describedby={passwordDescribedBy}
							disabled={isSubmitting}
						/>
						<Field.Description id="password-description">
							Minimal 6 karakter agar akun lebih aman.
						</Field.Description>
						{#if passwordError}
							<Field.Error id="password-error">{passwordError}</Field.Error>
						{/if}
					</Field.Field>
					<Field.Field>
						<Button type="submit" disabled={!isFormReady || isSubmitting}>
							{#if isSubmitting}
								<Spinner aria-hidden="true" />
								Creating account...
							{:else}
								Create Account
							{/if}
						</Button>
						<Field.Description class="text-center">
							Already have an account? <a href="#/">Sign in</a>
						</Field.Description>
					</Field.Field>
				</Field.Group>
			</form>
		</Card.Content>
	</Card.Root>
	<Field.Description class="px-6 text-center">
		By clicking continue, you agree to our <a href="#/">Terms of Service</a>
		and <a href="#/">Privacy Policy</a>.
	</Field.Description>
</div>
