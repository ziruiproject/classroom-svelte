<script>
	import { signInWithEmailAndPassword } from 'firebase/auth';
	import { auth } from '$lib';
	import { goto } from '$app/navigation';

	let email = '',
		password = '';

	async function login() {
		await signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				const user = userCredential.user;
				console.log(user);
				goto('/');
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				console.log(errorMessage);
			});
	}
</script>

<div class="text-white flex items-center">
	<div class="p-1 border-[2px] border-light-gray rounded-2xl">
		<svg
			width="32px"
			height="32px"
			stroke-width="1.5"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			><path
				d="M15 6L9 12L15 18"
				class="stroke-white"
				stroke-width="1.5"
				stroke-linecap="round"
				stroke-linejoin="round"
			></path>
		</svg>
	</div>
	<h1 class="text-4xl font-bold pl-6">Log in</h1>
</div>

<form on:submit|preventDefault={login} class="pt-12 grid gap-y-8 w-full">
	<div class="w-full grid gap-y-4">
		<label for="email" class="label">Email</label>
		<input type="text" name="email" bind:value={email} class="form-input" />
	</div>
	<div class="w-full grid gap-y-4">
		<label for="password" class="label">Password</label>
		<input type="password" name="password" bind:value={password} class="form-input" />
	</div>
	<button type="submit" class="bg-green py-4 text-xl rounded-2xl">Log in</button>
</form>
