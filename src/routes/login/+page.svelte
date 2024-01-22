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

<form on:submit|preventDefault={login} class="grid px-8 gap-y-4">
	<label for="email">Email</label>
	<input type="text" name="email" bind:value={email} />
	<label for="password">Password</label>
	<input type="password" name="password" bind:value={password} />
	<button type="submit">Daftar</button>
</form>
