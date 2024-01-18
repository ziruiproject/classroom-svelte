<script>
	import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

	const auth = getAuth();
	createUserWithEmailAndPassword(auth, email, password)
		.then((userCredential) => {
			// Signed up
			const user = userCredential.user;
			// ...
		})
		.catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
			// ..
		});
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
