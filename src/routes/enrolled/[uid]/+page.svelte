<script>
	import { enrolledStore, userStore, auth } from '$lib';

	let user = userStore(auth);
	let enrolled;

	$: if ($user) {
		enrolled = enrolledStore($user.uid);
	}
</script>

<main>
	{#if $user}
		<h1>Hello, {$user.displayName || 'User'}!</h1>

		{#if $enrolled}
			{#each $enrolled as enrolledClass (enrolledClass.uid)}
				<!-- Display information about each enrolled class -->
				<div>
					<h2>{enrolledClass.title}</h2>
					<p>Active: {enrolledClass.active}</p>
					<p>Price: {enrolledClass.price}</p>
					<!-- Add more details as needed -->
				</div>
			{/each}
		{:else}
			<p>No enrolled classes found.</p>
		{/if}
	{:else}
		<p>User not logged in.</p>
	{/if}
</main>
