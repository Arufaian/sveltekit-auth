<script lang="ts">
	import { cn } from '$lib/utils.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Field from '$lib/components/ui/field/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import type { HTMLAttributes } from 'svelte/elements';

	import { enhance } from '$app/forms';

	let { class: className, ...restProps }: HTMLAttributes<HTMLDivElement> = $props();
</script>

<div class={cn('flex flex-col gap-6', className)} {...restProps}>
	<Card.Root>
		<Card.Header class="text-center">
			<Card.Title class="text-xl">Create your account</Card.Title>
			<Card.Description>Enter your email below to create your account</Card.Description>
		</Card.Header>
		<Card.Content>
			<form use:enhance method="post">
				<Field.Group>
					<Field.Field>
						<Field.Label for="email">Email</Field.Label>
						<Input id="email" type="email" name="email" placeholder="m@example.com" required />
					</Field.Field>
					<Field.Field>
						<Field.Field>
							<Field.Field>
								<Field.Label for="password">Password</Field.Label>
								<Input id="password" type="password" name="password" required />
							</Field.Field>
						</Field.Field>
						<Field.Description>Must be at least 6 characters long.</Field.Description>
					</Field.Field>
					<Field.Field>
						<Button type="submit">Create Account</Button>
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
