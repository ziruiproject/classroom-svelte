<script>
	import { createUserWithEmailAndPassword } from 'firebase/auth';
	import { auth } from '$lib';

	let email = '',
		password = '';

	async function registration() {
		await createUserWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				const user = userCredential.user;
				console.log(user);
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				console.log(errorMessage);
				// ..
			});
	}
</script>

<h1>Regis</h1>
<form on:submit|preventDefault={registration}>
	<label for="email">Email</label>
	<input type="text" name="email" bind:value={email} />
	<label for="password">Password</label>
	<input type="password" name="password" bind:value={password} />
	<button type="submit">Daftar</button>
</form>
