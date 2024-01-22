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
	<h1 class="">Log in</h1>
</div>
<h1 class="text-gray">Hlo</h1>
<form on:submit|preventDefault={login} class="grid gap-y-4">
	<label for="email">Email</label>
	<input type="text" name="email" bind:value={email} />
	<label for="password">Password</label>
	<input type="password" name="password" bind:value={password} />
	<button type="submit">Daftar</button>
</form>
