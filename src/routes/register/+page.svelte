<script>
	import { createUserWithEmailAndPassword } from 'firebase/auth';
	import { auth } from '$lib';

	let email = '',
		password = '',
		confirmPass = '',
		confirmed = false,
		name = '';

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
			});
	}

	function signUpWithGoogle() {}

	function passwordChanges() {
		confirmed = password === confirmPass && password.length != 0;
	}
</script>

<svelte:head>
	<title>Sign Up</title>
</svelte:head>

<main class="md:w-1/4 mx-auto my-auto">
	<div class="flex text-white items-center pb-12">
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
		<h1 class="text-4xl font-bold pl-6 md:pl-0">Sign Up</h1>
	</div>

	<div class="grid gap-y-5">
		<span class="text-[#767676]">Sign up with one of the following options.</span>
		<button
			on:click|preventDefault={signUpWithGoogle}
			class="form hover:border-green flex items-center align-middle justify-center gap-1"
		>
			<svg
				width="24px"
				height="24px"
				stroke-width="1.5"
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				color="#ffffff"
				><path
					d="M15.5475 8.30327C14.6407 7.49361 13.4329 7 12.1089 7C9.28696 7 7 9.23899 7 12C7 14.761 9.28696 17 12.1089 17C15.5781 17 16.86 14.4296 17 12.4167H12.841"
					stroke="#ffffff"
					stroke-width="1.5"
				></path><path
					d="M21 8V16C21 18.7614 18.7614 21 16 21H8C5.23858 21 3 18.7614 3 16V8C3 5.23858 5.23858 3 8 3H16C18.7614 3 21 5.23858 21 8Z"
					stroke="#ffffff"
					stroke-width="1.5"
					stroke-linecap="round"
					stroke-linejoin="round"
				></path></svg
			>
			<span class="mt-1 font-normal">Google</span>
		</button>
	</div>

	<form on:submit|preventDefault={registration} class="pt-12 grid gap-y-8 w-full">
		<div class="w-full grid gap-y-4">
			<label for="email" class="label">Email</label>
			<input type="text" name="email" bind:value={email} class="form" />
		</div>
		<div class="w-full grid gap-y-4">
			<label for="name" class="label">Name</label>
			<input type="text" name="name" bind:value={name} class="form" />
		</div>
		<div class="w-full grid gap-y-4">
			<label for="password" class="label">Password</label>
			<input
				type="password"
				name="password"
				bind:value={password}
				class="form"
				on:change={passwordChanges}
			/>
		</div>
		<div class="w-full grid gap-y-4">
			<label for="confirmPassword" class="label">Confirm Password</label>
			<input
				type="password"
				name="confirmPassword"
				bind:value={confirmPass}
				class="form"
				on:change={passwordChanges}
			/>
			{#if confirmed}
				<span class="text-[#767676]"> Password Match. You're ready to go! </span>
			{/if}
		</div>
		<button type="submit" class="button">Sign Up</button>
	</form>
</main>
