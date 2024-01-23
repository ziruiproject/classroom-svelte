<script>
	import { auth } from '$lib';
	import { userStore } from '$lib';

	let currentUser = userStore(auth);
	let loading = true;

	$: photoProfile =
		$currentUser?.photoProfile ||
		`https://placehold.co/500x500/green/white/?text=${$currentUser?.displayName}`;
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<main>
	{#if $currentUser?.displayName === undefined}
		<h1>loading</h1>
	{:else}
		<div class="flex">
			<img src={photoProfile} alt="" class="rounded-full w-16" />
			<h1>{$currentUser?.displayName}</h1>
		</div>
	{/if}
</main>
