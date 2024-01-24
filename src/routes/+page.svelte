<script>
	import { onAuthStateChanged } from 'firebase/auth';
	import { userStore, auth, db } from '$lib';
	import { afterUpdate, beforeUpdate, onMount } from 'svelte';
	import { collection, getDocs, query, where, documentId } from 'firebase/firestore';

	let user = userStore(auth);
	let enrolledClasses = [];

	async function getClasses() {
		if ($user?.uid === undefined) {
			return;
		}

		enrolledClasses = [];

		const enrolledRef = collection(db, 'enrolled');
		const classesRef = collection(db, 'classes');
		const q = query(enrolledRef, where('userUid', '==', $user?.uid));
		const querySnapshot = await getDocs(q);

		for (const doc of querySnapshot.docs) {
			console.log(doc.data());

			const q = query(classesRef, where(documentId(), '==', doc.data().classUid));
			const querySnapshot = await getDocs(q);

			querySnapshot.forEach((doc) => {
				enrolledClasses.push(doc.data());
				enrolledClasses = enrolledClasses;
			});
		}
	}

	function getRandomColor() {
		return '#' + Math.floor(Math.random() * 16777215).toString(16);
	}

	$: $user, getClasses();

	$: photoProfile =
		$user?.photoProfile ||
		`https://placehold.co/500x500/green/white/?text=${$user?.displayName?.[0]}`;
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<main>
	<div class="flex items-center justify-between align-middle">
		<div class="gap-x-4 flex items-center align-middle">
			<img src={photoProfile} alt="" class="w-16 rounded-full" />
			<div>
				<h1 class="text-xl font-semibold">{$user?.displayName}</h1>
				<span class="text-lighter-gray text-lg font-light">Semangat Belajar</span>
			</div>
		</div>
		<div class="bg-green rounded-xl p-3">
			<svg
				width="24px"
				height="24px"
				stroke-width="1.5"
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				color="#ffffff"
				><path
					d="M14 20.4V14.6C14 14.2686 14.2686 14 14.6 14H20.4C20.7314 14 21 14.2686 21 14.6V20.4C21 20.7314 20.7314 21 20.4 21H14.6C14.2686 21 14 20.7314 14 20.4Z"
					stroke="#ffffff"
					stroke-width="1.5"
				></path><path
					d="M3 20.4V14.6C3 14.2686 3.26863 14 3.6 14H9.4C9.73137 14 10 14.2686 10 14.6V20.4C10 20.7314 9.73137 21 9.4 21H3.6C3.26863 21 3 20.7314 3 20.4Z"
					stroke="#ffffff"
					stroke-width="1.5"
				></path><path
					d="M14 9.4V3.6C14 3.26863 14.2686 3 14.6 3H20.4C20.7314 3 21 3.26863 21 3.6V9.4C21 9.73137 20.7314 10 20.4 10H14.6C14.2686 10 14 9.73137 14 9.4Z"
					stroke="#ffffff"
					stroke-width="1.5"
				></path><path
					d="M3 9.4V3.6C3 3.26863 3.26863 3 3.6 3H9.4C9.73137 3 10 3.26863 10 3.6V9.4C10 9.73137 9.73137 10 9.4 10H3.6C3.26863 10 3 9.73137 3 9.4Z"
					stroke="#ffffff"
					stroke-width="1.5"
				></path></svg
			>
		</div>
	</div>
	<div class="gap-x-4 grid grid-cols-2 pt-8">
		{#each enrolledClasses as enrolled}
			<div class="bg-[#ff8c0b] rounded-xl p-2">
				<span class="text-2xl">{enrolled.title}</span>
			</div>
		{/each}
	</div>
</main>
