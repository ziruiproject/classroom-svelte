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

<main class="md:w-1/4 mx-auto my-auto">
	<div class="flex text-white items-center">
		<button class="md:hidden block p-1 border-[3px] border-light-gray rounded-2xl">
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
		</button>
		<h1 class="text-4xl font-bold pl-6 md:pl-0">Log in</h1>
	</div>

	<div>
		<span>Login with one of the following options.</span>
		<button class="form hover:border-green">Google</button>
	</div>

	<form on:submit|preventDefault={login} class="pt-12 grid gap-y-8 w-full">
		<div class="w-full grid gap-y-4">
			<label for="email" class="label">Email</label>
			<input type="text" name="email" bind:value={email} class="form" />
		</div>
		<div class="w-full grid gap-y-4">
			<label for="password" class="label">Password</label>
			<input type="password" name="password" bind:value={password} class="form" />
		</div>
		<button type="submit" class="button">Log in</button>
	</form>
</main>
