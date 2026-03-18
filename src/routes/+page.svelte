<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/components/ui/button/button.svelte';
	import { resolve } from '$app/paths';
	import { enhance } from '$app/forms';
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>
<Button class="cursor-pointer" onclick={() => goto(resolve('/auth/register'))}>Register</Button>

<form action="/auth/signout" method="post" use:enhance>
	<Button type="submit" class="cursor-pointer">Logout</Button>
</form>
