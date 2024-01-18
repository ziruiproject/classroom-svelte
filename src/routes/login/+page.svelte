<script>
	import { signInWithEmailAndPassword } from 'firebase/auth';
	import { auth } from '../../firebase';
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

<h1>Login</h1>
<form on:submit|preventDefault={login}>
	<label for="email">Email</label>
	<input type="text" name="email" bind:value={email} />
	<label for="password">Password</label>
	<input type="password" name="password" bind:value={password} />
	<button type="submit">Daftar</button>
</form>
